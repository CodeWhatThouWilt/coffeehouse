const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const { Server, Channel, Member, Message, User } = require('../../db/models');
const { Op } = require('sequelize');
const { requireAuth } = require('../../utils/auth');
const { handleValidationErrors } = require('../../utils/validation');
const { check } = require('express-validator');
const { singleMulterUpload, singlePublicFileUpload } = require('../../utils/awss3');

const defaultServerIcon = 'https://coffeehouse-app.s3.amazonaws.com/default-icons/coffeehouse-default-server+(512+%C3%97+512+px).svg';


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

    const normalizedServers = {};

    userServers.forEach(membership => {
        const server = membership.dataValues.Server;
        normalizedServers[server.id] = server;

        const currentServer = normalizedServers[server.id];
        const channels = server.dataValues.Channels;
        const normalizedChannels = {};

        channels.forEach(channel => {
            normalizedChannels[channel.id] = channel;
        });
        currentServer.dataValues.Channels = normalizedChannels
    });

    return res.json(normalizedServers);
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

    const normalizedServer = server;
    // normalizedServer[server.id] = server;
    normalizedServer.dataValues.Members = {};
    normalizedServer.dataValues.Members[member.id] = member;
    normalizedServer.dataValues.Channels = {}
    normalizedServer.dataValues.Channels[channel.id] = channel;
    return res.json(normalizedServer);
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

        return res.json({ id: serverId, iconURL: newIcon, name: name });
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


const validateChannel = [
    check('name')
        .isLength({ min: 1, max: 100 })
        .withMessage('Valid name length: 1-100')
        .custom(async (val, { req }) => {
            const { name } = req.body
            if (name.endsWith('-')) {
                return await Promise.reject('Name must end with a letter')
            };
        }),
    handleValidationErrors
];

router.post('/:serverId(\\d+)/channels', requireAuth, validateChannel, asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const { serverId } = req.params;
    const { name } = req.body;

    const newChannel = await Channel.create({
        serverId,
        name
    });

    return res.json(newChannel);
}));

router.put('/:serverId(\\d+)/channels/:channelId(\\d+)', requireAuth, validateChannel, asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const { serverId, channelId } = req.params;
    const { name } = req.body;

    const channel = await Channel.findByPk(channelId);
    channel.name = name;
    await channel.save();

    return res.json(channel);
}));

router.delete('/:serverId(\\d+)/channels/:channelId(\\d+)', requireAuth, asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const { channelId, serverId } = req.params;

    const channel = await Channel.findByPk(channelId);
    await channel.destroy();

    return res.json({ channelId, serverId });
}));


router.get('/:serverId(\\d+)/channels/:channelId(\\d+)/messages', requireAuth, asyncHandler(async (req, res) => {
    const { channelId, serverId } = req.params;

    const channelMessages = await Message.findAll({
        where: {
            channelId
        }
    });

    const normalizedMessages = {};
    channelMessages.forEach(message => {
        normalizedMessages[message.id] = message;
    });

    return res.json({ serverId, channelId, messages: normalizedMessages });
}));

router.post('/:serverId(\\d+)/channels/:channelId(\\d+)/messages', requireAuth, asyncHandler(async (req, res) => {
    const { channelId, serverId } = req.params;
    const { content } = req.body;
    const userId = req.user.id;

    const message = await Message.create({
        channelId,
        serverId,
        userId,
        content
    });

    return res.json(message);
}));

router.get('/:serverId(\\d+)/members', requireAuth, asyncHandler(async(req, res) => {
    const { serverId } = req.params;

    const members = await Member.findAll({
        where: {
            serverId
        },
        include: User
    });
    console.log("####### MEMBERS:", members[0])

    const normalizedMembers = {};
    members.forEach(member => {
        normalizedMembers[member.User.id] = member
    })
    return res.json({ serverId, members: normalizedMembers });
}));


module.exports = router;