import './SidebarChannelPanel.css';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const SideBarChannelPanel = () => {
    const { serverId } = useParams();
    const server = useSelector(state => state.serversState);
    const channels = server[serverId].channels;
    const channelsArr = Object.values(channels);

    return (
        <div className='sb-channel-panel-container'>
            <div>
                Server
                {/* TO DO server dropdown menu */}
            </div>
            <div>
                {channelsArr.map(channel => (
                    <div>{channel.name}</div>
                ))}
            </div>
        </div>
    );
};

export default SideBarChannelPanel;