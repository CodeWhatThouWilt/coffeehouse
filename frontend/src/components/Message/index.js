import './Message.css';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const Message = ({ message, member }) => {
    // const { serverId } = useParams();
    // const servers = useSelector(state => state.serversState);
    // const server = servers[serverId];
    // const members = server.Members;
    // const messageOwner = members[message.userId];
    // const ownerData = messageOwner.User;
    // console.log(member)
    return (
        <div className='message-container'>
            <img src={member?.User.profilePicture} alt='pfp' />
            <div className='message-text-container'>
                <div className='message-username'>
                    {member?.User.username}
                </div>
                <div className='message-content'>
                    {message.content}
                </div>
            </div>
        </div>
    );
};

export default Message;