const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const { Server, Channel, Member } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const { handleValidationErrors } = require('../../utils/validation');
const { check } = require('express-validator');
const { singleMulterUpload, singlePublicFileUpload } = require('../../utils/awss3')

const defaultServerIcon = 'https://coffeehouse-app.s3.amazonaws.com/default-icons/coffeehouse-default-server+(512+%C3%97+512+px).svg'

router.get('/', requireAuth, asyncHandler(async (req, res) => {
    const userId = req.user.id;

    const servers = await Server.findAll({
        where: {
            ownerId: userId
        },
        include: {
            model: Channel
        }
    });

    const normalizedServers = {};
    servers.forEach(server => {
        normalizedServers[server.id] = server;
        const currentServer = normalizedServers[server.id];
        const normalizedChannels = {};

        currentServer.Channels.forEach(channel => {
            normalizedChannels[channel.id] = channel;
        });
        currentServer.dataValues.Channels = normalizedChannels;
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
        const serverId = req.params;
        const { name } = req.body;
        const imageFile = req.file;
        const userId = req.user.id;
        // if file undefined skip aws process
        const server = await Server.findByPk(serverId);
        console.log(imageFile);

        // if (imageFile) {
        //     const iconURL = await singlePublicFileUpload(req.file);
        //     server = await Server.create({
        //         name,
        //         ownerId: userId,
        //         iconURL
        //     });
        // } else {
        //     server = await Server.create({
        //         name,
        //         ownerId: userId,
        //         iconURL: null
        //     });
        // };

        // const channel = await Channel.create({
        //     serverId: server.id,
        //     name: 'general'
        // });

        // const member = await Member.create({
        //     serverId: server.id,
        //     userId
        // })

        // const normalizedServer = server;
        // // normalizedServer[server.id] = server;
        // normalizedServer.dataValues.Members = {};
        // normalizedServer.dataValues.Members[member.id] = member;
        // normalizedServer.dataValues.Channels = {}
        // normalizedServer.dataValues.Channels[channel.id] = channel;
        // return res.json(normalizedServer);
    }));


router.delete('/:serverId(\\d+)', requireAuth, asyncHandler(async(req, res) => {
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
        .exists({ checkFalsy: true })
        .isLength({ min: 1, max: 100 })
        .withMessage('Valid name length: 1-100'),
    handleValidationErrors
];

router.post('/:serverId(\\d+)/channels', requireAuth, validateChannel, asyncHandler(async(req, res) => {
    const userId = req.user.id;
    const { serverId } = req.params;
    const { name } = req.body;

    const newChannel = await Channel.create({
        serverId,
        name
    });

    return res.json(newChannel);
}));

router.put('/:serverId(\\d+)/channels/:channelId(\\d+)', requireAuth, validateChannel, asyncHandler(async(req, res) => {
    const userId = req.user.id;
    const { serverId, channelId } = req.params;
    const { name } = req.body;

    const channel = await Channel.findByPk(channelId);
    channel.name = name;
    await channel.save();

    return res.json(channel);
}));

router.delete('/:serverId(\\d+)/channels/:channelId(\\d+)', requireAuth, asyncHandler(async(req, res) => {
    const userId = req.user.id;
    const { channelId, serverId } = req.params;
    
    const channel = await Channel.findByPk(channelId);
    await channel.destroy();

    return res.json({channelId, serverId});
}));   


module.exports = router;