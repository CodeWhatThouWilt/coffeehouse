const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const { Server, Channel } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');


router.get('/', requireAuth, asyncHandler(async(req, res) => {
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
        const normalizedChannels = {}
        

        currentServer.Channels.forEach(channel => {
            normalizedChannels[channel.id] = channel;
        });
        currentServer.channels = normalizedChannels;
        delete currentServer.dataValues.Channels;
        currentServer.dataValues.channels = normalizedChannels;
    });
    return res.json(normalizedServers);

}));

router.post('/', requireAuth, asyncHandler())


module.exports = router;