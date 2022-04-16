import './MessagingArea.css';
import { useParams } from 'react-router-dom';

const MessagingArea = () => {
    const { channelId } = useParams();
    console.log(channelId);

    return (
        <div className='messaging-area-container'>MessagingArea</div>
    );
};

export default MessagingArea;