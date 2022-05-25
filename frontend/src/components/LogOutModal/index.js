import './LogOutModal.css';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { logout } from '../../store/session';
import { SocketContext } from '../../context/socket';
import { useContext } from 'react';

const LogOutModal = ({ setShowLogOutModal }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const socket = useContext(SocketContext);
    const user = useSelector(state => state.sessionState.user);

    const clickHandler = () => {
        dispatch(logout());
        history.push('/login');
    };

    return (
        <div className='logout-container'>
            <div className='delete-server-header'>Log Out</div>
            <div className='logout-middle'>
                Are you sure you want to logout?
            </div>
            <div className='delete-server-bottom'>
                <div onClick={() => setShowLogOutModal(false)} className='delete-server-cancel'>
                    Cancel
                </div>
                <button onClick={() => clickHandler()} className='delete-server-submit'>
                    Log Out
                </button>
            </div>
        </div>
    );
};

export default LogOutModal;