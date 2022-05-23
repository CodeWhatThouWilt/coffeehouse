import './MainContent.css';
import MessagingArea from '../MessagingArea';
import MemberArea from '../MemberArea';
import MainContentTopBar from '../MainContentTopBar';
import { getServerMembers } from '../../store/servers';
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
    const membersObj = server.Members;
    const [members, setMembers] = useState();

    useEffect(() => {
        dispatch(getServerMembers(serverId))
        .then(res => setMembers(Object.values(res.members)))
            .then(() => dispatch(getChannelMessages({ serverId, channelId })))
            .then(() => setIsLoaded(true))
    }, [dispatch, serverId, channelId]);

    useEffect(() => {
        socket = io();
        socket.on(serverId, member => {
            if (member.action === 'join') {
                setMembers(members => [...members, member]);
            } else if (member.action === 'leave') {
                delete membersObj[member.serverId];
                setMembers(Object.values(membersObj));
            };
        });

        return (() => {
            socket.disconnect();
        });
    }, [serverId, members]);


    return (
        <div className='main-content-container'>
            <MainContentTopBar channel={channel} setShowMembers={setShowMembers} showMembers={showMembers} />
            <div className='main-content-inner-container'>
                {isLoaded && messages && members &&
                    <MessagingArea messages={messages} members={members} channel={channel} showMembers={showMembers}/>
                }
                {showMembers && isLoaded && members &&
                    <MemberArea members={members} server={server} />
                }
            </div>
        </div>
    );
};

export default MainContent;