const express = require('express');
const router = express.Router({ mergeParams: true });
const asyncHandler = require('express-async-handler');
const { Server, Channel, Member, Message, User, ServerInvite } = require('../../db/models');
const { Op } = require('sequelize');
const { requireAuth } = require('../../utils/auth');
const { handleValidationErrors } = require('../../utils/validation');
const { check } = require('express-validator');
const { singleMulterUpload, singlePublicFileUpload } = require('../../utils/awss3');

// Get all messages for a channel
router.get(
    "/:serverId(\\d+)/channels/:channelId(\\d+)/messages",
    requireAuth,
    asyncHandler(async (req, res) => {
		const { channelId, serverId } = req.params;

		const channelMessages = await Message.findAll({
			where: {
				channelId,
                serverId
			},
			include: User,
		});

		return res.json(channelMessages);
	})
);

// TODO remove when finished with all other socket routes
// Create a message
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

module.exports = router;