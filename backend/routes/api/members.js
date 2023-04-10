const express = require('express');
const router = express.Router({ mergeParams: true });
const asyncHandler = require('express-async-handler');
const { Server, Channel, Member, Message, User, ServerInvite } = require('../../db/models');
const { Op } = require('sequelize');
const { requireAuth } = require('../../utils/auth');
const { handleValidationErrors } = require('../../utils/validation');
const { check } = require('express-validator');
const { singleMulterUpload, singlePublicFileUpload } = require('../../utils/awss3');


// Get all members for a server
router.get(
	"/",
	requireAuth,
	asyncHandler(async (req, res) => {
		const { serverId } = req.params;

		const members = await Member.findAll({
			where: {
				serverId,
			},
			include: User,
		});

		return res.json(members);
	})
);

// Delete member from a server
router.delete(
	"/:memberId(\\d+)",
	requireAuth,
	asyncHandler(async (req, res) => {
		const { memberId, serverId } = req.params;
		const userId = req.user.id;

		const member = await Member.findByPk(memberId, {
			include: { model: Server },
		});

		const serverOwner = member.dataValues.Server.dataValues.ownerId;

		if (userId !== serverOwner) {
			await member.destroy();
			return res.json({ serverId, userId: member.userId });
		}
	})
);

module.exports = router