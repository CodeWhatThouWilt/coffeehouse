import './ChannelSettings.css';
import '../ServerSettings/ServerSettings.css';
import { useState } from 'react';
import { editChannel } from '../../store/servers';
import { useDispatch } from 'react-redux';
import ChannelSettingsSidebar from '../ChannelSettingsSidebar';
import ChannelSettingsOverview from '../ChannelSettingsOverview';
import CloseSettings from '../CloseSettings';

const ChannelSettings = ({ channel, setShowModal }) => {
    const [currentForm, setCurrentForm] = useState('overview');
    


    return (
        <div className='server-settings-container'>
            <ChannelSettingsSidebar 
            channel={channel} 
            setCurrentForm={setCurrentForm} 
            setShowModal={setShowModal}
            />
            <ChannelSettingsOverview channel={channel} />
            <CloseSettings setShowModal={setShowModal} />
        </div>
        
    );
};

export default ChannelSettings;