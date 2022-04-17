import './MessagingArea.css';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getChannelMessages } from '../../store/servers';
import MessageInputBar from '../MessageInputBar';

const MessagingArea = ({ messages }) => {
    const messagesArr = Object.values(messages);
    

    return (
        <div className='messaging-area-container'>
            <div className='messaging-area-list'>
                {messagesArr.map(message => (
                    <div>{message.content}</div>
                ))}
            </div>
            <MessageInputBar />
        </div>
    );
};

export default MessagingArea;