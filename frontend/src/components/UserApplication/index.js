import './UserApplication.css';
import Navbar from '../Navbar';
import Sidebar from '../Sidebar';
import MainContent from '../MainContent';
import { Route, Redirect } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserServers } from '../../store/servers';
import NoChannelsToDisplay from '../NoChannelsToDisplay';
import SelectAServer from '../SelectAServer';
import { useParams } from 'react-router-dom';

const UserApplication = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    const dispatch = useDispatch();
    const { serverId, channelId, } = useParams();
    const session = useSelector(state => state.sessionState);
    const servers = useSelector(state => state.serversState);
    const server = servers[serverId];
    const channels = server?.Channels;

    useEffect(() => {
        dispatch(getUserServers())
            .then(() => setIsLoaded(true));
    }, [dispatch]);

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
                    {serverId && !channelId &&
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