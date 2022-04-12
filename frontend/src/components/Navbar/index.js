import './Navbar.css';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { useEffect } from 'react';
import { getUserServers } from '../../store/servers';

const Navbar = () => {
    const dispatch = useDispatch();
    const servers = useSelector(state => state.serversState);
    const serversArr = Object.values(servers);

    useEffect(() => {
        dispatch(getUserServers());
    },[dispatch]);

    return (
        <nav className='navbar-container'>
            {serversArr.map(server => (
                <div className='navbar-icon-container' key={server.id} >
                    <div></div>
                    <NavLink to={`/channels/${server.id}`}>
                        <img src={server.iconURL} alt='icon' className='navbar-server-icon' />
                    </NavLink>
                </div>
            ))}
        </nav>
    );
};

export default Navbar;