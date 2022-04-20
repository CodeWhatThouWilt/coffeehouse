import './MessageInputBar.css';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createMessage } from '../../store/servers';
import { useParams } from 'react-router-dom';

const MessageInputBar = ({ socket }) => {
    const { serverId, channelId } = useParams();
    const dispatch = useDispatch();
    const [content, setContent] = useState("");
    const { user } = useSelector(state => state.sessionState);

    // const submitHandler = (e) => {
    //     e.preventDefault();
    //     dispatch(createMessage({
    //         serverId,
    //         channelId,
    //         content
    //     }));
    // };

    const submitHandler = (e) => {
        e.preventDefault();
        socket.emit(`chat`, { user: user.username, content, room: `${channelId}` });
        setContent("");
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