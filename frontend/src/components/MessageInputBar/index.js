import './MessageInputBar.css';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createMessage } from '../../store/servers';
import { useParams } from 'react-router-dom';

const MessageInputBar = () => {
    const { serverId, channelId } = useParams();
    const dispatch = useDispatch();
    const [content, setContent] = useState();

    const submitHandler = () => {
        dispatch(createMessage({
            serverId,
            channelId,
            content
        }));
    };


    return (
        <form className='message-input-bar-container'>
            <input 
            type='text'
            value={content}
            onChange={e => setContent(e.target.value)}
            />
        </form>
    );
};

export default MessageInputBar;