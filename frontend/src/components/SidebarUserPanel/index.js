import './SidebarUserPanel.css';
import { useSelector } from 'react-redux';

const SidebarUserPanel = () => {
    const sessionUser = useSelector(state => state.sessionState.user);
    console.log(sessionUser)

    return (
        <div className='sidebar-user-panel-container'>
            <div className='sidebar-user-panel-image-container'>
                <img src={sessionUser.profilePicture} alt='pfp' className='sidebar-user-panel-image'/>
            </div>
            <div className='sidebar-user-panel-username-container'>
                <div className='sidebar-user-panel-username'>
                    {sessionUser.username}
                </div>
            </div>
            <div className='sidebar-user-panel-icon-tray'>
                <div className='sidebar-user-panel-settings-icon'>
                    <i className="fa-solid fa-gear"></i>
                </div>
            </div>
        </div>
    );
};

export default SidebarUserPanel;