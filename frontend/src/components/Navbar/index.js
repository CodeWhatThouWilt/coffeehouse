import './Navbar.css';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Redirect, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Modal } from '../../context/modal';
import CreateServerForm from '../CreateServerForm';
import { getServerMembers } from '../../store/servers';


const Navbar = () => {
    const dispatch = useDispatch();
    const servers = useSelector(state => state.serversState);
    const serversArr = Object.values(servers);
    const [showModal, setShowModal] = useState(false);
    const { serverId, channelId } = useParams();
    const [currentServer, setCurrentServer] = useState(serverId);
    const [currentChannel, setCurrentChannel] = useState(channelId);

    useEffect(() => {
        setCurrentChannel(channelId);
        setCurrentServer(serverId);
    }, [serverId, channelId]);

    const routeHandler = (serverId) => {
        const server = servers[serverId];
        const serverChannels = Object.values(server.Channels);
        if (serverChannels.length) {
            return `/channels/${serverId}/${serverChannels[0].id}`
        } else {
            return `/channels/${serverId}`
        }
    };


    if (!currentServer) {
        <Redirect to={`/@me`} />
    } else if (currentServer && !currentChannel) {
        const server = servers[currentServer];
        const hasChannels = Object.values(server.Channels).length > 0;
        if (hasChannels) {
            const firstChannel = Object.values(server.Channels)[0];
            <Redirect to={`/channels/${currentServer}/${firstChannel.id}`} />
        }
    }

    return (
        <>
            <nav className='navbar-container'>
                {serversArr.map(server => (
                    <div className='navbar-icon-container' key={server.id} >
                        <div className='navbar-icon-notif-container'>
                            <div className='navbar-icon-notif'></div>
                        </div>
                        <NavLink to={routeHandler(server.id)}>
                            <img src={server.iconURL} alt='icon' className='navbar-server-icon' />
                        </NavLink>
                    </div>
                ))}
                <div onClick={() => setShowModal(true)} className='navbar-new-server-icon'>
                    <i className="fa-light fa-plus new-server-icon"></i>
                </div>
            </nav>
            {showModal &&
                <Modal onClose={() => setShowModal(false)}>
                    <CreateServerForm setShowModal={setShowModal} />
                </Modal>
            }
        </>
    );
};

export default Navbar;