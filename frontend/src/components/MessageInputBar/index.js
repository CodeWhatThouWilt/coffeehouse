import './MessageInputBar.css';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createMessage } from '../../store/servers';
import { useParams } from 'react-router-dom';
import { io } from 'socket.io-client';
let socket;

const MessageInputBar = ({ channel, showMembers }) => {
    const { serverId, channelId } = useParams();
    const dispatch = useDispatch();
    const [content, setContent] = useState("");
    const { user } = useSelector(state => state.sessionState);

    const submitHandler = (e) => {
        e.preventDefault();
        if (content.length === 0 || content.length > 2000) return
        socket = io();
        dispatch(createMessage({
            serverId,
            channelId,
            content,
            profilePicture: user.profilePicture,
            username: user.username
        }))
            .then(res => socket.emit(`chat`, res))
            .then(() => setContent(""))
    };

    const stylingHandler = () => {
        if (showMembers) {
            return 'message-input-bar-container-show-members'
        } else {
            return 'message-input-bar-container'
        };
    };


    return (
        <form onSubmit={e => submitHandler(e)} className={stylingHandler()}>
            <input
                type='text'
                value={content}
                maxLength={2000}
                onChange={e => setContent(e.target.value)}
                placeholder={`Message ${channel.name}`}
            />
        </form>
    );
};

export default MessageInputBar;