import './ServerSettings.css';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import ServerSettingsSidebar from '../ServerSettingsSidebar';
import ServerSettingsOverview from '../ServerSettingsOverview';
import CloseSettings from '../CloseSettings';

const ServerSettings = ({ setShowModal }) => {
    const [currentForm, setCurrentForm] = useState('overview');
    const { serverId } = useParams();
    const servers = useSelector(state => state.serversState);
    const server = servers[serverId];
    
    return (
        <div className='server-settings-container'>
            <ServerSettingsSidebar server={server} setCurrentForm={setCurrentForm} />
            <ServerSettingsOverview server={server} />
            <CloseSettings setShowModal={setShowModal} />
        </div>
    );
};

export default ServerSettings;