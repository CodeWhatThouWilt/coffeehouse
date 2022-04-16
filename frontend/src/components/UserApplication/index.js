import './UserApplication.css';
import Navbar from '../Navbar';
import Sidebar from '../Sidebar';
import MainContent from '../MainContent';
import { Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getUserServers } from '../../store/servers';
import NoChannelsToDisplay from '../NoChannelsToDisplay';

const UserApplication = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUserServers())
            .then(() => setIsLoaded(true))
    }, [dispatch])

    return (
        <div className='application-container'>
            {isLoaded &&
                <Route path='/channels'>
                    <Navbar />
                    <Sidebar />
                    <Route path='/channels/:serverId/:channelId'>
                        <MainContent />
                    </Route>
                    <Route exact path='/channels/:serverId'>
                        <NoChannelsToDisplay />
                    </Route>
                </Route>
            }
        </div>
    );
};

export default UserApplication;