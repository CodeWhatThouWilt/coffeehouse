import './LeaveServerModal.css';
import { deleteMember } from '../../store/members';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { io } from 'socket.io-client';
let socket;

const LeaveServerModal = ({ server, setShowLeaveModal }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const session = useSelector(state => state.sessionState);
    const user = session.user;
    const members = server.Members;
    const member = members[user.id];
    const memberId = member.id

    const clickHandler = () => {
        dispatch(deleteMember({ serverId: server.id, memberId }));
        history.push('/@me');
        socket = io();
        socket.emit('member-leave', member);
    };

    return (
        <div className='leave-server-container'>
            <div className='delete-server-header'>
                Leave '{server.name}'
            </div>
            <div className='leave-server-middle'>
                Are you sure you want to leave <span className='delete-server-name'>{server.name}</span>?
            </div>
            <div className='delete-server-bottom'>
                <div onClick={() => setShowLeaveModal(false)} className='delete-server-cancel'>
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