const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const { Server, Channel, Member } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const { handleValidationErrors } = require('../../utils/validation');
const { check } = require('express-validator');
const { singleMulterUpload } = require('../../utils/awss3')

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
        currentServer.channels = normalizedChannels;
        delete currentServer.dataValues.Channels;
        currentServer.dataValues.channels = normalizedChannels;
    });
    return res.json(normalizedServers);
}));


const validateServer = [
    check('form')
        .custom(async (value, { req }) => {
            if (req.file) {
                const fileType = req.file.mimetype;

                if (!fileType.startsWith('image/')) {
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
            iconURL
        });
    } else {
        server = await Server.create({
            name,
            ownerId: userId,
            iconURL: null
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

    const normalizedServer = {};
    normalizedServer[server.id] = server;
    normalizedServer[server.id].Members[member.id] = member;
    // normalizedServer[server.id].channels[channel.id] = channel;
    console.log("###########", normalizedServer);
    return res.json(normalizedServer)
}));


module.exports = router;