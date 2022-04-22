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
    const members = server.Members

    
    useEffect(() => {
        dispatch(getChannelMessages({ serverId, channelId }))
            .then(res => setIsLoaded(true))
    }, [dispatch, serverId, channelId]);


    return (
        <div className='main-content-container'>
            <MainContentTopBar channel={channel} setShowMembers={setShowMembers} showMembers={showMembers} />
            <div className='main-content-inner-container'>
                {isLoaded && messages && members &&
                    <MessagingArea messages={messages} />
                }
                {showMembers && isLoaded && messages && members &&
                    <MemberArea members={members} />
                }
            </div>
        </div>
    );
};

export default MainContent;