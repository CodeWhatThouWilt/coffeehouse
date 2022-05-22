import './Message.css';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useRef, useEffect } from 'react';

const Message = ({ message, member, ref }) => {
    const divRef = useRef(null);
    console.log(message);
    useEffect(() => {
        divRef.current.scrollIntoView();
    }, []);

    
    return (
        <div ref={divRef} className='message-container'>
            <img src={message.User.profilePicture} alt='pfp' />
            <div className='message-text-container'>
                <div className='message-username'>
                    {message.User.username}
                </div>
                <div className='message-content'>
                    {message.content}
                </div>
            </div>
        </div>
    );
};

export default Message;