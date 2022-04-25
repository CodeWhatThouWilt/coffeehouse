import './ChannelSettingsSidebar.css';
import '../ServerSettingsSidebar/ServerSettingsSidebar.css';
import DeleteChannelModal from '../DeleteChannelModal';
import { Modal } from '../../context/modal';
import { useState } from 'react';

const ChannelSettingsSidebar = ({ channel, setShowModal }) => {
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    return (
        <>
            <div className='settings-sidebar-container'>
                <nav className='settings-sidebar-nav'>
                    <div className='settings-sidebar-header'>
                        <i className="fa-solid fa-hashtag settings-hashtag" />
                        {channel.name}
                    </div>
                    <div className='settings-sidebar-item-active'>
                        Overview
                    </div>
                    <div onClick={() => setShowDeleteModal(true)} className='settings-sidebar-item-inactive'>
                        Delete Channel
                    </div>
                </nav>
            </div>
            {showDeleteModal &&
                <Modal onClose={() => setShowDeleteModal(false)}>
                    <DeleteChannelModal channel={channel} setShowDeleteModal={setShowDeleteModal} />
                </Modal>
            }
        </>
    );
};

export default ChannelSettingsSidebar;