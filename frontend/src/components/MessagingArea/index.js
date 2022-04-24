import './MessagingArea.css';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getChannelMessages } from '../../store/servers';
import MessageInputBar from '../MessageInputBar';
import Message from '../Message';
import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
let socket;

const MessagingArea = ({ messages, members, channel }) => {
    const messagesArr = Object.values(messages);
    const [channelMessages, setChannelMessages] = useState(messagesArr);
    const { serverId, channelId } = useParams();
    
    useEffect(() => {
        socket = io();
        setChannelMessages(messagesArr);

        socket.on(channelId, chat => {
            setChannelMessages(channelMessages => [...channelMessages, chat]);
        });
        
        return (() => {
            socket.disconnect();
        });
    }, [serverId, channelId]);

    return (
        <div className='messaging-area-container'>
            <div className='messaging-area-list'>
                {channelMessages.map((message, i) => (
                    <Message message={message} member={members[message.userId]} />
                ))}
            </div>
            <MessageInputBar channel={channel} />
        </div>
    );
};

export default MessagingArea;