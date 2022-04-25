import './LeaveServerModal.css';
import { exitServer } from '../../store/servers';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

const LeaveServerModal = ({ server, setShowModal }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const session = useSelector(state => state.sessionState);
    const user = session.user;
    const members = server.Members;
    const member = members[user.id];
    const memberId = member.id

    const clickHandler = () => {
        dispatch(exitServer({ serverId: server.id, memberId }));
        history.push('/@me');
    }

    return (
        <div className='leave-server-container'>
            <div className='delete-server-header'>
                Leave '{server.name}'
            </div>
            <div className='leave-server-middle'>
                Are you sure you want to leave <span>{server.name}</span>?
            </div>
            <div className='delete-server-bottom'>
                <div oncClick={() => setShowModal(false)} className='delete-server-cancel'>
                    cancel
                </div>
                <button onClick={() => clickHandler()} className='delete-server-submit'>
                    Leave Server
                </button>
            </div>
        </div>
    );
};

export default LeaveServerModal;