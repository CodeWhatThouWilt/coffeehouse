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

// TODO redo routes / create routes to avoid sending too much data
// TODO remove loops in backend routes and offload to reducers

// TODO restructure this to be more like a query route and put this into current user route
// Get servers that current user belongs to
router.get('/', requireAuth, asyncHandler(async (req, res) => {
    const userId = req.user.id;

    const userServers = await Server.findAll({
        include: [{
            model: Member,
            where: {
                userId
            },
            attributes: []
        }],
        order: [
            ['id', 'ASC']
        ]
    })

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

// Create a server
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

// Edit a server
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

// Delete a server
router.delete('/:serverId(\\d+)', requireAuth, asyncHandler(async (req, res) => {
    const { serverId } = req.params;
    const userId = req.user.id;
    const server = await Server.findByPk(serverId);
    if (server.ownerId === userId) {
        await server.destroy();
        return res.json(server.id);
    };

    const err = new Error('Unauthorized');
    err.title = 'Unauthorized';
    err.errors = ['Unauthorized'];
    err.status = 401;
    return next(err);
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