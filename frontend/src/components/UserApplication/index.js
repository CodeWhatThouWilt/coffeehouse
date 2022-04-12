import './UserApplication.css';
import Navbar from '../Navbar';
import Sidebar from '../Sidebar';
import MainContent from '../MainContent';
import { Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getUserServers } from '../../store/servers';

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
                    <MainContent />
                </Route>
            }
        </div>
    );
};

export default UserApplication;