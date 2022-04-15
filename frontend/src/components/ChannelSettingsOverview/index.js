import './ChannelSettingsOverview.css';
import { useDispatch } from 'react-redux';
import { editChannel } from '../../store/servers';
import { useState } from 'react';

const ChannelSettingsOverview = ({ channel }) => {
    const dispatch = useDispatch();
    const [name, setName] = useState(channel.name);

    const submitHandler = () => {
        dispatch(editChannel({
            name,
            serverId: channel.serverId,
            channelId: channel.id
        }));
    };

    return (
        <div className='create-channel-form-container'>
            <form onSubmit={() => submitHandler()} id='new-channel-form'>
                <input
                    value={name}
                    onChange={e => setName(e.target.value)}
                />
            </form>
            <div onClick={() => submitHandler()} form='new-channel-form'>Submit</div>
        </div>
    );
};

export default ChannelSettingsOverview;