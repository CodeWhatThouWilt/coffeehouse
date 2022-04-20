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
    const { serverId, channelId } = useParams();
    
    useEffect(() => {
        socket = io();

        socket.on(channelId, chat => {
            setChannelMessages(channelMessages => [...channelMessages, chat]);
        });
        
        return (() => {
            socket.disconnect();
        });
    }, [serverId, channelId]);
    
    console.log(socket);
    console.log("#### CHANNEL MESSAGES", channelMessages, messages);

    return (
        <div className='messaging-area-container'>
            <div className='messaging-area-list'>
                {channelMessages.map((message, i) => (
                    <div key={i}>{message.content}</div>
                ))}
            </div>
            <MessageInputBar socket={socket} />
        </div>
    );
};

export default MessagingArea;