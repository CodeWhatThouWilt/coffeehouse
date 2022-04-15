import './ServerSettingsOverview.css';
import { useState } from 'react';
import { editServer } from '../../store/servers';
import { useDispatch } from 'react-redux';


const ServerSettingsOverview = ({ server }) => {
    const dispatch = useDispatch();
    const [newServerIcon, setNewServerIcon] = useState(server.iconURL);
    const [newServerName, setNewServerName] = useState(server.name);
    const defaultServerIcon = 'https://coffeehouse-app.s3.amazonaws.com/default-icons/coffeehouse-default-server+(512+%C3%97+512+px).svg'
    const showIcon = newServerIcon === defaultServerIcon ? newServerIcon : URL.createObjectURL(newServerIcon);
    
    console.log('showicon', showIcon)
    console.log('state change', newServerIcon);
    
    const checkForChanges = () => {
        const currentImage = server.iconURL;
        const currentName = server.name;
        if (currentImage !== newServerIcon || currentName !== newServerName) {
            return true
        } else {
            return false
        };
    };

    const resetHandler = () => {
        console.log("111", newServerIcon);
        setNewServerIcon(server.iconURL);
        setNewServerName(server.name);
        setTimeout(() => console.log("222", newServerIcon), 5000)
        
        return;
    };

    // const submitHandler = () => {
    //     const formData = new FormData();
    //     formData.append('name', newServerName);
    //     if (showIcon !== defaultServerIcon) {
    //         formData.append('image', newServerIcon);
    //     };
    //     dispatch(editServer(formData))
    // };

    return (
        <>
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
                            {newServerIcon !== defaultServerIcon &&
                                <div onClick={() => setNewServerIcon(defaultServerIcon)} className='server-settings-remove-server-icon'>
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
                            onChange={e => setNewServerIcon(e.target.files[0])}
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
                {checkForChanges() &&
                    <div className='server-settings-confirm-changes-container'>
                        <div className='server-settings-confirm-changes-text'>
                            Careful - you have unsaved changes!
                        </div>
                        <div className='server-settings-confirm-changes-buttons-container'>
                            <div onClick={() => resetHandler()} className='server-settings-confirm-changes-reset'>
                                Reset
                            </div>
                            <div className='server-settings-confirm-changes-save'>
                                Save Changes
                            </div>
                        </div>
                    </div>
                }
            </div>
        </>
    );
};

export default ServerSettingsOverview;