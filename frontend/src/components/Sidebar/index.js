import './Sidebar.css';
import SidebarUserPanel from '../SidebarUserPanel';
import SideBarChannelPanel from '../SidebarChannelPanel';
import { Route } from 'react-router-dom';

const Sidebar = () => {
    
    return (
        <div className='sidebar-container'>
            <Route path='/channels/:serverId'>
                <SideBarChannelPanel />
            </Route>
                <SidebarUserPanel />
        </div>
    );
};

export default Sidebar;