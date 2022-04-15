const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const { Server, Channel, Member } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const { handleValidationErrors } = require('../../utils/validation');
const { check } = require('express-validator');
const { singleMulterUpload, singlePublicFileUpload } = require('../../utils/awss3');




const validateChannel = [
    check('name')
        .exists({ checkFalsy: true })
        .isLength({ min: 1, max: 100 })
        .withMessage('Valid name length: 1-100'),
    handleValidationErrors
];

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

router.put('/:channelId(\\d+)', requireAuth, validateChannel, asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const { serverId, channelId } = req.params;
    const { name } = req.body;

    const channel = await Channel.findByPk(channelId);
    channel.name = name;
    await channel.save();

    return res.json(channel);
}));

router.delete('/:channelId(\\d+)', requireAuth, asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const { channelId, serverId } = req.params;

    const channel = await Channel.findByPk(channelId);
    await channel.destroy();

    return res.json({ channelId, serverId });
}));   

module.exports = router;