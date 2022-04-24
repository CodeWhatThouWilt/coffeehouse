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
        <div className='settings-sidebar-container'>
            <nav className='settings-sidebar-nav'>
                <div className='settings-sidebar-header'>
                    <i className="fa-solid fa-hashtag settings-hashtag" />
                    {channel.name}
                </div>
                <div className='settings-sidebar-item-active'>
                    Overview
                </div>
                <div onClick={() => deleteHandler()} className='settings-sidebar-item-inactive'>
                    Delete Channel
                </div>
            </nav>
            
        </div>
    );
};

export default ChannelSettingsSidebar;