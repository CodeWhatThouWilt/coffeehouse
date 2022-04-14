import './ServerSettingsOverview.css';
import { useState } from 'react';


const ServerSettingsOverview = ({ server }) => {
    const [serverIcon, setServerIcon] = useState(server.iconURL);
    const [newServerName, setNewServerName] = useState(server.name);
    const defaultServerIcon = 'https://coffeehouse-app.s3.amazonaws.com/default-icons/coffeehouse-default-server+(512+%C3%97+512+px).svg'
    const showIcon = serverIcon === defaultServerIcon ? serverIcon : URL.createObjectURL(serverIcon);

    return (
        <div className='server-settings-form-container'>
            <div className='server-settings-form-header'>
                <h1>Server Overview</h1>
            </div>
            <div className='server-settings-name-image-container'>
                <div className='server-settings-upload-image-container'>
                    <div className='server-settings-upload-image-left-container'>
                        <label htmlFor='new-server-image'>
                            <div className='server-settings-upload-icons'>
                                <div className='server-settings-image-circle'>
                                    <i className="fa-solid fa-image server-settings-icon-circle" />
                                </div>
                                <img src={showIcon} alt='server icon' className="server-settings-upload-image" />
                            </div>
                        </label>
                        {serverIcon !== defaultServerIcon &&
                            <div  onClick={() => setServerIcon(defaultServerIcon)} className='server-settings-remove-server-icon'>
                                REMOVE
                            </div>
                        }
                    </div>
                    <div className='server-settings-upload-image-right-container'>
                        <div className='server-settings-upload-image-tip'>
                            We recommend an image of at least 512x512 for the server.
                        </div>
                        <label htmlFor='new-server-image' >
                            <div className='server-settings-upload-image-button'>
                                Upload Image
                            </div>
                        </label>
                    </div>
                    <input
                        id='new-server-image'
                        type='file'
                        accept='image/*'
                        hidden={true}
                        onChange={e => setServerIcon(e.target.files[0])}
                    />
                </div>
                <div className='server-settings-server-name-container' >
                    <div className='server-settings-server-name-tag'>
                        SERVER NAME
                    </div>
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