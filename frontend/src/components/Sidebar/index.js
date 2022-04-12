import './Sidebar.css';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import SidebarUserPanel from '../SidebarUserPanel';

const Sidebar = () => {
    const { serverId } = useParams();
    const server = useSelector(state => state.serversState);
    const channels = server[serverId].channels;
    const channelsArr = Object.values(channels);
    console.log(channelsArr)
    return (
        <div className='sidebar-container'>
            <div>
                Server
                {/* TO DO server dropdown menu */}
            </div>
            <div>
                {channelsArr.map(channel => (
                    <div>{channel.name}</div>
                ))}
            </div>
            <SidebarUserPanel />
        </div>
    );
};

export default Sidebar;