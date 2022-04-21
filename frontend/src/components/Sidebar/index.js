import './Sidebar.css';
import SidebarUserPanel from '../SidebarUserPanel';
import SidebarChannelPanel from '../SidebarChannelPanel';
import SidebarServerPanel from '../SidebarServerPanel';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

const Sidebar = () => {
    const { channelId } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {

    }, [])

    return (
        <div className='sidebar-container'>
            <SidebarServerPanel />
            <SidebarChannelPanel />
            <SidebarUserPanel />
        </div>
    );
};

export default Sidebar;