import './ServerSettings.css';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import ServerSettingsSidebar from '../ServerSettingsSidebar';
import ServerSettingsOverview from '../ServerSettingsOverview';

const ServerSettings = () => {
    const [currentForm, setCurrentForm] = useState('overview');
    const { serverId } = useParams();
    const servers = useSelector(state => state.serversState);
    const server = servers[serverId];
    
    return (
        <div className='server-settings-container'>
            <ServerSettingsSidebar setCurrentForm={setCurrentForm} />
            <ServerSettingsOverview server={server} />
        </div>
    );
};

export default ServerSettings;