const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const { Server, Channel, Member, Message, User, ServerInvite } = require('../../db/models');
const { Op } = require('sequelize');
const { requireAuth } = require('../../utils/auth');
const { handleValidationErrors } = require('../../utils/validation');
const { check } = require('express-validator');
const { singleMulterUpload, singlePublicFileUpload } = require('../../utils/awss3');

const defaultServerIcon = 'https://coffeehouse-app.s3.amazonaws.com/default-icons/coffeehouse-default-server+(512+%C3%97+512+px).svg';

// TODO split into multiple different routers

// TODO redo routes / create routes to avoid sending too much data
// TODO remove loops in backend routes and offload to reducers

router.get('/', requireAuth, asyncHandler(async (req, res) => {
    const userId = req.user.id;

    const userServers = await Member.findAll({
        where: {
            userId
        },
        include: [{
            model: Server,
            include: [{
                model: Channel
            }]
        }]
    });

    return res.json(userServers);
}));


const validateServer = [
    check('form')
        .custom(async (value, { req }) => {
            if (req.file) {
                const fileType = req.file.mimetype;

                if (!fileType.startsWith('image/') && !fileType.endsWith('gif')) {
                    return await Promise.reject('File needs to be an image')
                };
            };
        }),
    check('name')
        .isLength({ min: 1, max: 100 })
        .withMessage('Valid name length: 1-100'),
    handleValidationErrors
];


router.post('/', requireAuth, singleMulterUpload('image'), validateServer, asyncHandler(async (req, res) => {
    const { name } = req.body;
    const imageFile = req.file;
    const userId = req.user.id;
    // if file undefined skip aws process

    let server;
    if (imageFile) {
        const iconURL = await singlePublicFileUpload(req.file);
        server = await Server.create({
            name,
            ownerId: userId,
            iconURL
        });
    } else {
        server = await Server.create({
            name,
            ownerId: userId,
            iconURL: defaultServerIcon
        });
    };

    const channel = await Channel.create({
        serverId: server.id,
        name: 'general'
    });

    const member = await Member.create({
        serverId: server.id,
        userId
    })

    return res.json({ server, channel, member });
}));


router.put('/:serverId(\\d+)', requireAuth,
    singleMulterUpload('image'), validateServer, asyncHandler(async (req, res) => {
        const { serverId } = req.params;
        const { name, image } = req.body;
        const imageFile = req.file;
        const userId = req.user.id;
        const server = await Server.findByPk(serverId);

        let newIcon;
        if (imageFile) newIcon = await singlePublicFileUpload(imageFile);
        if (image) newIcon = image;
        server.iconURL = newIcon;
        server.name = name;

        await server.save();

        return res.json(server);
    }));


router.delete('/:serverId(\\d+)', requireAuth, asyncHandler(async (req, res) => {
    const { serverId } = req.params;
    const userId = req.user.id;
    const server = await Server.findByPk(serverId);
    if (server.ownerId === userId) {
        await server.destroy();
        return res.json(serverId);
    };

    const err = new Error('Unauthorized');
    err.title = 'Unauthorized';
    err.errors = ['Unauthorized'];
    err.status = 401;
    return next(err);
}));

router.get('/:serverId(\\d+)/channels/:channelId(\\d+)/messages', requireAuth, asyncHandler(async (req, res) => {
    const { channelId, serverId } = req.params;

    const channelMessages = await Message.findAll({
        where: {
            channelId
        },
        include: User
    });

    const normalizedMessages = {};
    channelMessages.forEach(message => {
        normalizedMessages[message.id] = message;
    });

    return res.json({ serverId, channelId, messages: normalizedMessages });
}));


// TODO remove when finished with all other socket routes
// router.post('/:serverId(\\d+)/channels/:channelId(\\d+)/messages', requireAuth, asyncHandler(async (req, res) => {
//     const { channelId, serverId } = req.params;
//     const { content, profilePicture, username } = req.body;
//     const userId = req.user.id;

//     const message = await Message.create({
//         channelId,
//         serverId,
//         userId,
//         content
//     });

//     message.dataValues.User = { profilePicture, username };

//     return res.json(message);
// }));

router.get('/:serverId(\\d+)/members', requireAuth, asyncHandler(async(req, res) => {
    const { serverId } = req.params;

    const members = await Member.findAll({
        where: {
            serverId
        },
        include: User
    });

    const normalizedMembers = {};
    members.forEach(member => {
        normalizedMembers[member.User.id] = member;
    });
    return res.json({ serverId, members: normalizedMembers });
}));

router.delete('/:serverId(\\d+)/members/:memberId(\\d+)', requireAuth, asyncHandler(async(req, res) => {
    const { memberId, serverId } = req.params;
    const userId = req.user.id;
    
    const member = await Member.findByPk(memberId, {
        include: { model: Server }
    });

    const serverOwner = member.dataValues.Server.dataValues.ownerId;
    
    if (userId !== serverOwner) {
        await member.destroy();
        return res.json({ serverId, userId: member.userId })
    }

}));

router.post('/:serverId(\\d+)/invites', requireAuth, asyncHandler(async(req, res) => {
    const { serverId, expiration, maxUses } = req.body;

    const date = new Date();
    const nums = date.getTime();
    const path = 'inv' + nums + serverId + (maxUses || '');

    const invite = await ServerInvite.create({
        serverId,
        expiration,
        maxUses,
        link: path
    });

    return res.json(invite);
}));


module.exports = router;