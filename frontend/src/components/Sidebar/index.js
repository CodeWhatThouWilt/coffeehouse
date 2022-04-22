import './Sidebar.css';
import SidebarUserPanel from '../SidebarUserPanel';
import SidebarChannelPanel from '../SidebarChannelPanel';
import SidebarServerPanel from '../SidebarServerPanel';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getServerMembers } from '../../store/servers';

const Sidebar = () => {
    const { serverId, channelId } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getServerMembers(serverId));
    }, [dispatch, serverId])

    return (
        <div className='sidebar-container'>
            {serverId &&
                <>
                    <SidebarServerPanel />
                    <SidebarChannelPanel />
                </>
            }
            <SidebarUserPanel />
        </div>
    );
};

export default Sidebar;