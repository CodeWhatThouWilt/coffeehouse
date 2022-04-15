import './SidebarChannel';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const SidebarChannel = ({ channel }) => {
    const { serverId } = useParams();

    return (
        <div>
            <Link to={`/channels/${serverId}/${channel.id}`}>
                <div key={channel.id} >{channel.name}</div>
            </Link>
            <i class="fa-solid fa-gear"></i>
        </div>
    );
};

export default SidebarChannel;