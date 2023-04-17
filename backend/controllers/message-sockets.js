const { Server, Channel, Member, Message } = require("../db/models");
const openai = require('openai');

openai.apiKey = process.env.OPENAI_KEY

const chatSubscribe = (socket, io) => {
    socket.on("join_room", (channelId) => {
		socket.join(`channel: ${channelId}`);
	});
}

const emitMessage = (socket, io) => {
    socket.on("chat", async (message) => {
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

const emitEditMessage = (socket, io) => {
    socket.on("chat edit", async (message) => {
        console.log(message)
        const editedMessage = await Message.findByPk(message.messageId);
        editedMessage.content = message.content;
        editedMessage.updatedAt = Date.now();
        await editedMessage.save();
        editedMessage.dataValues.User = socket.user;
        io.to(`channel: ${message.channelId}`).emit("chat edit", editedMessage);
    });    
}

const openAIChat = (socket, io) => {
    socket.on("openAI", async (message) => {
        try {
            const res = await openai.Completion.create({
                engine: 'text-davinci-002',
                prompt: message,
                max_tokens: 100,
                n: 1,
                stop: null,
                temperature: 0.7
            });
            console.log(res.choices);
        } catch (error) {
            console.error("###### ERROR: ", error);
            // io.to(`channel: openai`).emit("chat",)
        }
    })
}

module.exports = {
    chatSubscribe,
    emitMessage,
    emitEditMessage,
    openAIChat
}