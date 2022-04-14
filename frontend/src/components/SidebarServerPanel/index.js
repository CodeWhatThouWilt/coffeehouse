import './SidebarServerPanel.css';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

const SidebarServerPanel = () => {
    const [showDropdown, setShowDropdown] = useState(false);
    const { serverId } = useParams();
    const servers = useSelector(state => state.serversState);
    const sessionUser = useSelector(state => state.sessionState.user);
    const server = servers[serverId];
    const owner = server.ownerId;

    const dropdownHandler = () => {
        showDropdown ? setShowDropdown(false) : setShowDropdown(true);
    };

    useEffect(() => {
        if (!showDropdown) return;

        const closeDropdown = () => {
            setShowDropdown(false);
        };

        document.addEventListener('click', closeMenu);

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
            {dropdown &&
                <div className='sidebar-server-panel-dropdown-container'>
                    {owner === sessionUser.id &&
                        <div>
                            Server Settings
                        </div>
                    }

                </div>
            }
            </div>
        </>
    );
};

export default SidebarServerPanel;