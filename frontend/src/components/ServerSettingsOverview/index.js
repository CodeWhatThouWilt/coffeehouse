import './ServerSettingsOverview.css';
import { useState } from 'react';


const ServerSettingsOverview = ({ server }) => {
    const [serverIcon, setServerIcon] = useState(server.iconURL);
    const [newServerName, setNewServerName] = useState(server.name);


    return (
        <div className='server-settings-form-container'>
            <div className='server-settings-form-header'>
                <h1>Server Overview</h1>
            </div>
            <div className='server-settings-name-image-container'>
                <div className='server-settings-upload-image-container'>
                    <label>
                        <div className='server-settings-upload-icons'>
                            <div className='server-settings-image-circle'>
                                <i className="fa-solid fa-image server-settings-icon-circle" />
                            </div>
                            <img src={serverIcon} alt='server icon' className="server-settings-upload-image" />
                        </div>
                    </label>
                </div>
                <div>
                <input 
                value={newServerName}
                onChange={e => setNewServerName(e.target.value)}
                />
                </div>
            </div>
        </div>
    );
};

export default ServerSettingsOverview;