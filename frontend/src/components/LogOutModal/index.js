import './LogOutModal.css';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { logout } from '../../store/session';

const LogOutModal = ({ setShowLogOutModal }) => {
    const dispatch = useDispatch();
    const history = useHistory();

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