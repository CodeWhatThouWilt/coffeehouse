import './UserSettingsSidebar.css';
import { useState } from 'react';
import { Modal } from '../../context/modal';
import LogOutModal from '../LogOutModal';

const UserSettingsSidebar = ({ sessionUser }) => {
    const [showLogOutModal, setShowLogOutModal] = useState(false);


    return (
        <>
            <div className='settings-sidebar-container'>
                <nav className='settings-sidebar-nav'>
                    <div className='settings-sidebar-header'>User Settings</div>
                    <div className='settings-sidebar-item-active'>
                        My Account
                    </div>
                    <div onClick={() => setShowLogOutModal(true)} className='settings-sidebar-item-inactive'>
                        Log Out
                    </div>
                </nav>
            </div>
            {showLogOutModal &&
                <Modal onClose={() => setShowLogOutModal(false)} >
                    <LogOutModal setShowLogOutModal={setShowLogOutModal} />
                </Modal>
            }
        </>
    );
};

export default UserSettingsSidebar;