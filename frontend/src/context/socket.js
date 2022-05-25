import io from 'socket.io-client';
import React from 'react';
import { useContext } from 'react';

export const socket = io.connect('/');
export const SocketContext = React.createContext();