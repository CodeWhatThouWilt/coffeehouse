import './SidebarChannelPanel.css';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const SideBarChannelPanel = () => {
    const { serverId } = useParams();
    const servers = useSelector(state => state.serversState);
    console.log(servers)
    const server = servers[serverId];
    let channels;
    let channelsArr;
    if (server) {
        channels = server.Channels;
        channelsArr = Object.values(channels);
    }

    return server && (
        <div className='sb-channel-panel-container'>
            <div>
                {channelsArr.map(channel => (
                    <div key={channel.id} >{channel.name}</div>
                ))}
            </div>
        </div>
    );
};

export default SideBarChannelPanel;