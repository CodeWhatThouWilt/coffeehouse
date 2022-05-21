import './SidebarServerPanel.css';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Modal } from '../../context/modal';
import ServerSettings from '../ServerSettings';
import LeaveServerModal from '../LeaveServerModal';
import InvitePeople from '../InvitePeopleModal';

const SidebarServerPanel = () => {
    const [showDropdown, setShowDropdown] = useState(false);
    const [showSettingsModal, setShowSettingsModal] = useState(false);
    const [showLeaveModal, setShowLeaveModal] = useState(false);
    const [showInviteModal, setShowInviteModal] = useState(false);

    const { serverId } = useParams();
    const servers = useSelector(state => state.serversState);
    const sessionUser = useSelector(state => state.sessionState.user);
    const server = servers[serverId];
    const owner = server.ownerId;

    useEffect(() => {
        if (!showDropdown) return;

        const closeDropdown = () => {
            setShowDropdown(false);
        };

        document.addEventListener('click', closeDropdown);

        return () => document.removeEventListener("click", closeDropdown);
    }, [showDropdown]);


    return (
        <>
            <div onClick={() => setShowDropdown(true)} className='sidebar-server-panel-container'>
                <div className='sidebar-server-panel-name'>
                    {server.name}
                </div>
                <div className='sidebar-server-dropdown-button'>
                    <i className="fa-solid fa-chevron-down" />
                </div>
                {showDropdown &&
                    <div className='sidebar-server-panel-dropdown-container'>
                        <div onClick={() => setShowSettingsModal(true)} className='sidebar-server-panel-dropdown-item'>
                            Invite People
                            <i className="fa-solid fa-user-plus" />
                        </div>
                        {owner === sessionUser.id &&
                            <div onClick={() => setShowSettingsModal(true)} className='sidebar-server-panel-dropdown-item'>
                                Server Settings
                                <i className="fa-solid fa-gear" />
                            </div>
                        }
                        {owner !== sessionUser.id &&
                            <div onClick={() => setShowLeaveModal(true)}>
                                Leave Server
                            </div>
                        }
                    </div>
                }
            </div>
            {showSettingsModal &&
                <Modal onClose={() => setShowSettingsModal(false)}>
                    <ServerSettings setShowModal={setShowSettingsModal} />
                </Modal>
            }
            {showLeaveModal &&
                <Modal onClose={() => setShowLeaveModal(false)} >
                    <LeaveServerModal server={server} setShowLeaveModal={setShowLeaveModal} />
                </Modal>
            }
            <Modal onClose={() => setShowInviteModal(false)} >
                <InvitePeople setShowInviteModal={setShowInviteModal} server={server} />
            </Modal>
        </>
    );
};

export default SidebarServerPanel;