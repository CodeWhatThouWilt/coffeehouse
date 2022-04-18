import './MainContent.css';
import MessagingArea from '../MessagingArea';
import MemberArea from '../MemberArea';
import MainContentTopBar from '../MainContentTopBar';
import { useParams } from 'react-router-dom';
import { getChannelMessages } from '../../store/servers';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

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
    console.log("#### MESSAGES: ", messages);
    console.log("#### SERVER: ", server);
    console.log("#### : ", channel);

    useEffect(() => {
        dispatch(getChannelMessages({ serverId, channelId }))
            .then(res => setIsLoaded(true))
    }, [dispatch]);


    return (
        <div className='main-content-container'>
            <MainContentTopBar channel={channel} />
            <div className='main-content-inner-container'>
                {isLoaded &&
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