const { Server, Channel, Member, Message, User, ServerInvite } = require('../db/models');


const socketIoHandler = (io, socket) => {

    socket.on('join-rooms', channels => {
        // 'channels/:channelId
        socket.join(channels);
    });

    // Broadcasts when client disconnects
    socket.on('disconnect', () => {
        io.emit('chat', 'A user has left the chat');
    });

    // listen for chat
    socket.on('chat', (message) => {
        // socket.join(message.channelId);
        // io.emit(message.channelId, message);
        socket.to(`channels/${message.channelId}`)
            // .emit(message);
        .emit('chat', message);
    });

    socket.on('member-join', (member) => {
        member.action = 'join';
        socket.join(member.serverId);
        io.emit(member.serverId, member);
    });

    socket.on('member-leave', member => {
        member.action = 'leave';
        socket.join(member.serverId);
        io.emit(member.serverId, member);
    });

    socket.on('user-status', user => {
        console.log("#######", user);
        socket.join(user.id);
        io.emit(user.id, user);
    });
};

module.exports = socketIoHandler;