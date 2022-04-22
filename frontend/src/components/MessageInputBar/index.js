import './MessageInputBar.css';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createMessage } from '../../store/servers';
import { useParams } from 'react-router-dom';
import { io } from 'socket.io-client';
let socket;

const MessageInputBar = () => {
    const { serverId, channelId } = useParams();
    const dispatch = useDispatch();
    const [content, setContent] = useState("");
    const { user } = useSelector(state => state.sessionState);

    const submitHandler = (e) => {
        socket = io();
        e.preventDefault();
        dispatch(createMessage({
            serverId,
            channelId,
            content
        }))
            .then(res => socket.emit(`chat`, res))
            .then(() => setContent(""))
    };

    return (
        <form onSubmit={e => submitHandler(e)} className='message-input-bar-container'>
            <input
                type='text'
                value={content}
                onChange={e => setContent(e.target.value)}
            />
        </form>
    );
};

export default MessageInputBar;