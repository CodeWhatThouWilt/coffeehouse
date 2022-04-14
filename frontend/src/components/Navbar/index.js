import './Navbar.css';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getUserServers } from '../../store/servers';
import { Modal } from '../../context/modal';
import CreateServerForm from '../CreateServerForm';

const Navbar = () => {
    const dispatch = useDispatch();
    const servers = useSelector(state => state.serversState);
    const serversArr = Object.values(servers);
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <nav className='navbar-container'>
                {serversArr.map(server => (
                    <div className='navbar-icon-container' key={server.id} >
                        <div></div>
                        <NavLink to={`/channels/${server.id}`}>
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