import './KickMemberModal.css';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { deleteMember } from '../../store/members';

const KickMemberModal = ({ member, setShowKickModal }) => {
    const [kickReason, setKickReason] = useState('');
    const dispatch = useDispatch();
    console.log("I AM HERE NOW")

    const clickHandler = () => {
        const memberId = member.id;
        console.log(memberId);
        const serverId = member.serverId;
        console.log(serverId);
        dispatch(deleteMember({ memberId, serverId }))
        .then(() => setShowKickModal(false));
    };

    return (
        <div className='kick-member-modal'>
            <div className='kick-member-header'>Kick {member.User.username} from Server</div>
            <div className='kick-member-body'>
                <div>
                    Are you sure you want to kick @{member.User.username} from
                    the server? They will be able to rejoin again with
                    a new invite.
                </div>
                <div>
                    <label>Reason for kick</label>
                    <textarea 
                    maxLength={512} 
                    value={kickReason}
                    onChange={e => setKickReason(e.target.value)}
                    />
                    <span>{512 - kickReason.length}</span>
                </div>
            </div>
            <div className='delete-server-bottom'>
                <div onClick={() => setShowKickModal(false)} className='delete-server-cancel'>
                    Cancel
                </div>
                <button onClick={() => clickHandler()} className='kick-member-del-btn'>
                    Kick
                </button>
            </div>
        </div>
    );
};

export default KickMemberModal;