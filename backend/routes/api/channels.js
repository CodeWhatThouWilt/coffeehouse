const express = require('express');
const router = express.Router({ mergeParams: true });
const asyncHandler = require('express-async-handler');
const { Server, Channel, Member } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const { handleValidationErrors } = require('../../utils/validation');
const { check } = require('express-validator');
const { singleMulterUpload, singlePublicFileUpload } = require('../../utils/awss3');


const validateChannel = [
	check("name")
		.isLength({ min: 1, max: 100 })
		.withMessage("Valid name length: 1-100")
		.custom(async (val, { req }) => {
			const { name } = req.body;
			const splitName = name.split("");
			const symbolCheck = splitName.filter((char, i) => {
				const charCode = char.charCodeAt(0);
				const lowerCaseCodes = charCode > 96 && charCode < 123;
				const numbers = charCode > 47 && charCode < 58;
				const hyphen = charCode === 45;
				let hyphenRepeats = false;
				if (i > 2 && hyphen) {
					hyphenRepeats = name.charCodeAt(i - 1) === 45;
				}
				return (
					(!lowerCaseCodes && !numbers && !hyphen) || hyphenRepeats
				);
			});
			if (name.endsWith("-")) {
				return await Promise.reject(
					"Name must end with a letter or number"
				);
			} else if (name.startsWith("-")) {
				return await Promise.reject(
					"Name must start with a letter or number"
				);
			} else if (symbolCheck.length) {
				return await Promise.reject(
					'Name can only contain [a-z], [1-9] or "-"'
				);
			}
		}),
	handleValidationErrors,
];

// Get all channels for a server
router.get('/', requireAuth, asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const { serverId } = req.params;

    const serverChannels = await Channel.findAll({
        where: {
            serverId
        }
    });

    return res.json(serverChannels);
}));

// Create a channel
router.post('/', requireAuth, validateChannel, asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const { serverId } = req.params;
    const { name } = req.body;

    const newChannel = await Channel.create({
        serverId,
        name
    });

    return res.json(newChannel);
}));

// Edit a channel
router.put('/:channelId(\\d+)', requireAuth, validateChannel, asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const { serverId, channelId } = req.params;
    const { name } = req.body;

    const channel = await Channel.findByPk(channelId);
    channel.name = name;
    await channel.save();

    return res.json(channel);
}));

// Delete a channel
router.delete('/:channelId(\\d+)', requireAuth, asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const { channelId, serverId } = req.params;

    const channel = await Channel.findByPk(channelId);
    await channel.destroy();

    return res.json(channelId);
}));

module.exports = router;