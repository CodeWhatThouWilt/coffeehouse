import './MainContent.css';
import MessagingArea from '../MessagingArea';
import MemberArea from '../MemberArea';
import MainContentTopBar from '../MainContentTopBar';
import { useParams } from 'react-router-dom';
import { getChannelMessages } from '../../store/servers';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { io } from 'socket.io-client';
let socket;

const MainContent = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [showMembers, setShowMembers] = useState(false);
    const { serverId, channelId } = useParams();
    const dispatch = useDispatch();

    const servers = useSelector(state => state.serversState);
    const server = servers[serverId];
    const channel = server.Channels[channelId];
    const messages = channel.Messages;
    // TO DO GET MEMBERS AND PASS IT INTO MEMBERS AREA

    

    useEffect(() => {
        dispatch(getChannelMessages({ serverId, channelId }))
            .then(res => setIsLoaded(true))
    }, [dispatch, serverId, channelId]);


    return (
        <div className='main-content-container'>
            <MainContentTopBar channel={channel} setShowMembers={setShowMembers} />
            <div className='main-content-inner-container'>
                {isLoaded && messages &&
                    <MessagingArea messages={messages} />
                }
                {showMembers &&
                    <MemberArea />
                }
            </div>
        </div>
    );
};

export default MainContent;