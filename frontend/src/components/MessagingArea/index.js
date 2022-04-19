import './MessagingArea.css';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getChannelMessages } from '../../store/servers';
import MessageInputBar from '../MessageInputBar';
import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
let socket;

const MessagingArea = ({ messages }) => {
    const messagesArr = Object.values(messages);
    const [channelMessages, setChannelMessages] = useState(messagesArr);
    
    useEffect(() => {
        socket = io();

        socket.on("chat", chat => {
            setChannelMessages(channelMessages => [...channelMessages, chat])
        });

        return (() => {
            socket.disconnect();
        });
    }, []);
    console.log(socket);
    return (
        <div className='messaging-area-container'>
            <div className='messaging-area-list'>
                {channelMessages.map(message => (
                    <div key={message.id}>{message.content}</div>
                ))}
            </div>
            <MessageInputBar socket={socket} />
        </div>
    );
};

export default MessagingArea;