import './Sidebar.css';
import SidebarUserPanel from '../SidebarUserPanel';
import SidebarChannelPanel from '../SidebarChannelPanel';
import SidebarServerPanel from '../SidebarServerPanel';
import { Route } from 'react-router-dom';

const Sidebar = () => {

    return (
        <div className='sidebar-container'>
            <Route path='/channels/:serverId'>
                <SidebarServerPanel />
                <SidebarChannelPanel />
            </Route>
                <SidebarUserPanel />
        </div>
    );
};

export default Sidebar;