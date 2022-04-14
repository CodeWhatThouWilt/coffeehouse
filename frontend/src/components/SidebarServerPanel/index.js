import './SidebarServerPanel.css';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Modal } from '../../context/modal';
import ServerSettings from '../ServerSettings';

const SidebarServerPanel = () => {
    const [showDropdown, setShowDropdown] = useState(false);
    const [showModal, setShowModal] = useState(false);
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
                        {owner === sessionUser.id &&
                            <div onClick={() => setShowModal(true)}>
                                Server Settings
                            </div>
                        }
                        {owner !== sessionUser.id &&
                            <div>
                                Leave Server
                            </div>
                        }
                    </div>
                }
            </div>
            {/* {showModal && */}
                <Modal onClose={() => setShowModal(false)}>
                    <ServerSettings setShowModal={setShowModal} />
                </Modal>
            {/* } */}
        </>
    );
};

export default SidebarServerPanel;