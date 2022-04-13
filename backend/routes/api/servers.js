const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const { Server, Channel } = require('../../db/models');
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
    // if file undefined skip aws process
    console.log(imageFile);

}));


module.exports = router;