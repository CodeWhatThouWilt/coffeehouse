import './ChannelSettingsOverview.css';
import { useDispatch } from 'react-redux';
import { editChannel } from '../../store/channels';
import { useState } from 'react';

const ChannelSettingsOverview = ({ channel }) => {
    const dispatch = useDispatch();
    const [name, setName] = useState(channel.name);
    const [errors, setErrors] = useState([]);

    const buttonDisabler = () => {
        return name.length > 1 && name.length <= 100 ? false : true;
    };

    const submitHandler = (e) => {
        e.preventDefault();
        setErrors([]);
        const serverId = channel.serverId;
        const channelId = channel.id;
        const formData = { name, serverId, channelId };
        dispatch(editChannel(formData))
        .then(() => setErrors([]))
            .catch(async res => {
                const data = await res.json();
                data.errors && setErrors(data.errors);
            });
    };

    const checkForChanges = () => {
        const currentName = channel.name;
        if (currentName !== name) {
            return true
        } else {
            return false
        };
    };

    const resetHandler = () => {
        setErrors([]);
        setName(channel.name);
        return;
    };

    const confirmChangesStyling = () => {
        if (errors.length) {
            return 'server-settings-confirm-changes-container-errors';
        } else {
            return 'server-settings-confirm-changes-container';
        };
    };

    const submitButtonStyling = () => {
        if (buttonDisabler()) {
            return 'server-settings-confirm-changes-save-disabled';
        } else {
            return 'server-settings-confirm-changes-save-enabled';
        };
    };

    const inputHandler = (e) => {
        const input = e.target.value;
        const removeSpaces = input.replace(' ', '-');
        const removeSymbols = removeSpaces.replace(/[^a-zA-Z0-9-]/, '');
        const removeRepeatDash = removeSymbols.replace(/-{2,}?/, '-');
        setName(removeRepeatDash.toLowerCase());
    };

    return (
        <div className='server-settings-form-container channel-settings-container'>
            <div className='server-settings-form-header'>
                <h1>Overview</h1>
            </div>
            <div>
                <div onSubmit={() => submitHandler()} className='new-channel-form'>
                    <label className='input-label'>Channel Name</label>
                    <input
                        maxLength={100}
                        minLength={1}
                        value={name}
                        onChange={e => inputHandler(e)}
                    />
                </div>
            </div>
            {checkForChanges() &&
                <div className={confirmChangesStyling()}>
                    {errors.length > 0 &&
                        <div className='server-settings-confirm-changes-errors-container'>
                            <div className='server-settings-error'>{errors[0]}</div>
                        </div>
                    }
                    <div className='server-settings-confirm-changes-text'>
                        Careful - you have unsaved changes!
                    </div>
                    <div className='server-settings-confirm-changes-buttons-container'>
                        <div onClick={() => resetHandler()} className='server-settings-confirm-changes-reset'>
                            Reset
                        </div>
                        <div onClick={e => submitHandler(e)} className={submitButtonStyling()}>
                            Save Changes
                        </div>
                    </div>
                </div>
            }
        </div>
    );
};

export default ChannelSettingsOverview;