const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const { Server, Channel, Member, Message, User, ServerInvite } = require('../../db/models');
const { Op } = require('sequelize');
const { requireAuth, restoreUser } = require('../../utils/auth');

router.post('/:link', requireAuth, asyncHandler(async(req, res, next) => {
    const { link } = req.params;
    const userId = req.user.id;
    const date = new Date();

    const notFound = () => {
        const err = new Error('Not found');
        err.title = 'Not found';
        err.errors = ['Not found'];
        err.status = 404;
        return next(err);
    };
    
    const invite = await ServerInvite.findOne({
        where: {
            link,
            expiration: { [Op.gte]: date }
        }
    });

    if(!invite) return notFound();

    if (invite.maxUses > 0 ) {
        if (invite.uses >= invite.maxUses) return notFound();
        invite.uses++;
        await invite.save();
    };

    const member = await Member.findOne({
        where: {
            userId,
            serverId: invite.serverId
        }
    });

    if (member) return res.json({ newMember: false, member });

    const newMember = await Member.create({
        userId,
        serverId: invite.serverId
    });

    return res.json({ newMember: true, member: newMember });
}));


module.exports = router;