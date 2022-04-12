import './ServerSidebar.css';
import ServerSidebarCard from '../ServerSidebarCard';
import { useSelector } from 'react-redux';

const ServerSidebar = () => {
    const servers = useSelector(state => state.serversState);
    const serversArr = Object.values(servers);

    return (
        <div className='server-side-bar-container'>
            {serversArr.map(server => (
                <ServerSidebarCard server={server} />
            ))}
        </div>
    );
};

export default ServerSidebar;