const { Server, Channel, Member, Message, User } = require("../db/models");
require("dotenv").config();
const { Configuration, OpenAIApi} = require('openai');
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY
});
const openai = new OpenAIApi(configuration);

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
            console.log("### MESSAGE:", message)
            // console.log("PROCESS: ", configuration);
            const res = await openai.createChatCompletion({
                model: 'gpt-3.5-turbo',
                messages: [
                    {"role": "system", "content": "You are a user in a discord server that is chatting with other users. You can be very informal and don't need to sound like an assistant."},
                    {"role": "user", "content": `${message.content}`}
                ],
                // max_tokens: 300
            });
            console.log("#######", res.data.choices[0].message.content);
            const messageText = res.data.choices[0].message.content;

            const newMessage = await Message.create({
				channelId: message.channelId,
				serverId: message.serverId,
				userId: 3,
				content: messageText,
			});

            const aiUser = await User.findByPk(3);

			newMessage.dataValues.User = aiUser;
            io.to(`channel: 1`).emit("chat", newMessage);
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