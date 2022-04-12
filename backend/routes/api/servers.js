const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const { Server } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');


router.get('/', requireAuth, asyncHandler((req, res) => {
    const userId = req.user.id;

    const servers = Server.findAll({
        where: {
            ownerId: userId
        }
    });

    const normalizedServers = {};
    servers.forEach(server => normalizedServers[server.id] = server);
    return res.json(normalizedServers);

}));


module.exports = router;