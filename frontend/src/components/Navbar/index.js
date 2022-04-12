import './Navbar.css';
import { useSelector } from 'react-redux';

const Navbar = ({ setCurrentServer }) => {
    const servers = useSelector(state => state.serversState);
    const serversArr = Object.values(servers);

    return (
        <nav className='navbar-container'>
            {serversArr.map(server => (
                <div className='navbar-icon-container' >
                    <div></div>
                    <img src={server.iconURL} alt='icon' className='navbar-server-icon' />
                </div>
            ))}
        </nav>
    );
};

export default Navbar;