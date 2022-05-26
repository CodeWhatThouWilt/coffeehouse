import { io } from 'socket.io-client';
import React from 'react';

export const socket = io.connect('http://localhost:3000', {
    'reconnection': true,
    'reconnectionDelay': 500,
    'reconnectionAttempts': Infinity
});
export const SocketContext = React.createContext();