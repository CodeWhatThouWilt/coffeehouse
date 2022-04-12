import './UserApplication.css';
import ServerSidebar from '../Navbar';
import { useState } from 'react';

const UserApplication = () => {
    const [currentServer, setCurrentServer] = useState('');

    return (
        <ServerSidebar setCurrentServer={setCurrentServer} />
    );
};

export default UserApplication;