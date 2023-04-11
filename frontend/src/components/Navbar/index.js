import './Navbar.css';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Redirect, useParams } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import { Modal } from '../../context/modal';
import CreateServerForm from '../CreateServerForm';
import logo from '../../assets/coffeehouse-logo.svg';
import { getServers } from '../../store/selectors/servers';

const Navbar = () => {
    const dispatch = useDispatch();
    const servers = useSelector(state => getServers(state));
    const [showModal, setShowModal] = useState(false);
    const { serverId, channelId } = useParams();
    const [currentServer, setCurrentServer] = useState(serverId);
    const [currentChannel, setCurrentChannel] = useState(channelId);
    const channels = useSelector(state => state.channels);
    console.log(servers);
    useEffect(() => {
        setCurrentChannel(channelId);
        setCurrentServer(serverId);
    }, [serverId, channelId]);


    if (!currentServer) return <Redirect to={`/@me`} />

    return (
        <>
            <nav className='navbar-container'>
                {/* <div className='navbar-icon-container'>
                    <div className='navbar-icon-notif-container'>
                        <div className='navbar-icon-notif'></div>
                    </div>
                    <NavLink to='/@me'>
                        <img src={logo} alt='icon' className='navbar-server-icon' style={{ backgroundColor: 'black'}}/>
                    </NavLink>
                </div> */}
                {servers.map(server => (
                    <div className='navbar-icon-container' key={server.id} >
                        <div className='navbar-icon-notif-container'>
                            <div className='navbar-icon-notif'></div>
                        </div>
                        <NavLink  to={`/${serverId}`}>
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