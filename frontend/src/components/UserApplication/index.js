import './UserApplication.css';
import Navbar from '../Navbar';
import Sidebar from '../Sidebar';
import MainContent from '../MainContent';
import { Route, Redirect } from 'react-router-dom';
import React, { useState, useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserServers } from '../../store/servers';
import NoChannelsToDisplay from '../NoChannelsToDisplay';
import SelectAServer from '../SelectAServer';
import { useParams } from 'react-router-dom';
import SelectAChannel from '../SelectAChannel';
import { SocketContext } from '../../context/socket';
import { socket } from '../../context/socket';


const UserApplication = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    const dispatch = useDispatch();
    const { serverId, channelId, } = useParams();
    const session = useSelector(state => state.sessionState);
    const servers = useSelector(state => state.serversState);
    const server = servers[serverId];
    const channels = server?.Channels;
    const user = useSelector(state => state.sessionState.user);


    useEffect(() => {
        dispatch(getUserServers())
            .then(() => setIsLoaded(true));
    }, [dispatch, user]);

    if (!session.user) return <Redirect to='/login' />

    return (
        <div className='application-container'>
            {isLoaded &&
                <>
                    <Navbar />
                    <Sidebar />
                    {channelId &&
                        <MainContent />
                    }
                    {serverId && !channelId && Object.values(channels).length > 0 &&
                        <SelectAChannel />
                    }
                    {serverId && !channelId && Object.values(channels).length < 1 &&
                        <NoChannelsToDisplay />
                    }
                    {!serverId && !channelId &&
                        <SelectAServer />
                    }
                </>
            }
        </div>
    );
};

export default UserApplication;