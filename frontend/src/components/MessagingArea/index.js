import './MessagingArea.css';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getChannelMessages } from '../../store/servers';
import MessageInputBar from '../MessageInputBar';
import Message from '../Message';
import { useState, useEffect, useContext } from 'react';
import { SocketContext } from '../../context/socket';

const MessagingArea = ({ messages, members, channel, showMembers }) => {
    // const messagesArr = Object.values(messages);
    const [channelMessages, setChannelMessages] = useState(messages);
    const { serverId, channelId } = useParams();
    const socket = useContext(SocketContext);
    
    useEffect(() => {
        // setChannelMessages(channelMessages => messagesArr);

        socket.on(channelId, chat => {
            messages[chat.id] = chat;
            // setChannelMessages(channelMessages => ({...channelMessages, chat}));
            setChannelMessages({...messages})
            console.log(messages);
        });
        
        return (() => {
            socket.off(channelId);
        });
    }, [socket, serverId, channelId, messages, channelMessages]);

    const stylingHandler = () => {
        if (showMembers) {
            return 'messaging-area-container-member-open';
        } else {
            return 'messaging-area-container';
        }
    }

    return (
        <div className={stylingHandler()}>
            <div className='messaging-area-list'>
                {Object.values(messages).map((message, i) => (
                    <Message key={message.id} message={message} member={members[message.userId]} />
                ))}
            </div>
            <MessageInputBar channel={channel} showMembers={showMembers} />
        </div>
    );
};

export default MessagingArea;