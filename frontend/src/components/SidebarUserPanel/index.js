import './SidebarUserPanel.css';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { Modal } from '../../context/modal';
import UserSettings from '../UserSettings';

const SidebarUserPanel = () => {
    const [showModal, setShowModal] = useState(false);
    const sessionUser = useSelector(state => state.sessionState.user);

    return (
        <>
            <div className='sidebar-user-panel-container'>
                <div className='sidebar-user-panel-image-container'>
                    <img src={sessionUser.profilePicture} alt='pfp' className='sidebar-user-panel-image' />
                </div>
                <div className='sidebar-user-panel-username-container'>
                    <div className='sidebar-user-panel-username'>
                        {sessionUser.username}
                    </div>
                </div>
                <div className='sidebar-user-panel-icon-tray'>
                    <div onClick={() => setShowModal(true)} className='sidebar-user-panel-settings-icon'>
                        <i className="fa-solid fa-gear" />
                    </div>
                </div>
            </div>
            {showModal &&
                <Modal onClose={() => setShowModal(false)} >
                    <UserSettings sessionUser={sessionUser} setShowModal={setShowModal} />
                </Modal>
            }
        </>
    );
};

export default SidebarUserPanel;