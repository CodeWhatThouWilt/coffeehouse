import './Navbar.css';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useHistory, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getUserServers } from '../../store/servers';
import { Modal } from '../../context/modal';
import CreateServerForm from '../CreateServerForm';

const Navbar = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const servers = useSelector(state => state.serversState);
    const serversArr = Object.values(servers);
    const [showModal, setShowModal] = useState(false);
    const { serverId, userId } = useParams();

    const routeHandler = (serverId) => {
        const server = servers[serverId];
        const serverChannels = Object.values(server.Channels);
        if (serverChannels.length) {
            return `/channels/${serverId}/${serverChannels[0].id}`
        };
    };

    if (!serverId) {
        const firstServer = Object.values(servers)[0];
        
    }

    return (
        <>
            <nav className='navbar-container'>
                {serversArr.map(server => (
                    <div className='navbar-icon-container' key={server.id} >
                        <div></div>
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