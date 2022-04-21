import './UserApplication.css';
import Navbar from '../Navbar';
import Sidebar from '../Sidebar';
import MainContent from '../MainContent';
import { Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getUserServers } from '../../store/servers';
import NoChannelsToDisplay from '../NoChannelsToDisplay';
import { useParams } from 'react-router-dom';

const UserApplication = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    const dispatch = useDispatch();
    const { serverId, channelId } = useParams();

    useEffect(() => {
        dispatch(getUserServers())
            .then(() => setIsLoaded(true))
    }, [dispatch]);





    return (
        <div className='application-container'>
            {isLoaded &&
                <>
                    <Navbar />
                    <Sidebar />
                    <MainContent />
                </>
            }
        </div>
    );
};

export default UserApplication;