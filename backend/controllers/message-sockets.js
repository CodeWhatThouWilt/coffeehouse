const { Server, Channel, Member, Message } = require("../db/models");

const chatSubscribe = (socket, io) => {
    socket.on("join_room", (channelId) => {
		socket.join(`channel: ${channelId}`);
	});
}

const emitMessage = (socket, io) => {
    socket.on("chat", async (message) => {
		console.log("message:", message);
        const newMessage = await Message.create({
            channelId: message.channelId,
            serverId: message.serverId,
            userId: socket.user.id,
            content: message.content
        })

        newMessage.dataValues.User = socket.user

		io.to(`channel: ${message.channelId}`).emit("chat", newMessage);
	});
}

module.exports = {
    chatSubscribe,
    emitMessage
}