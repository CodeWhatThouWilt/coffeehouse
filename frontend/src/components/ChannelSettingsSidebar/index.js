import './ChannelSettingsSidebar.css';
import '../ServerSettingsSidebar/ServerSettingsSidebar.css';
import { useDispatch } from 'react-redux';
import { deleteChannel } from '../../store/servers';
import { useHistory } from 'react-router-dom';

const ChannelSettingsSidebar = ({ channel, setShowModal }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const serverId = channel.serverId;

    const deleteHandler = () => {
        dispatch(deleteChannel({ 
            channelId: channel.id, 
            serverId
        }));
        history.push(`/channels/${channel.serverId}`);
        setShowModal(false);
    };

    return (
        <div className='server-settings-sidebar-container'>
            <div>
                Overview
            </div>
            <div onClick={() => deleteHandler()}>
                Delete Channel
            </div>
        </div>
    );
};

export default ChannelSettingsSidebar;