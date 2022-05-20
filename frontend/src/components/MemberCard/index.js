import './MemberCard.css';
import { useState, useEffect } from 'react';
import { deleteMember } from '../../store/servers';
import { useDispatch, useSelector } from 'react-redux';
import KickMemberModal from '../KickMemberModal';
import Modal from '../../context/modal';

const MemberCard = ({ member, server }) => {
    const [rightMenu, setRightMenu] = useState(false);
    const dispatch = useDispatch();
    const [clickCoords, setClickCoords] = useState({});
    const ownerId = useSelector(state => state.sessionState.user.id);

    useEffect(() => {
        if (!rightMenu) return;

        const closeDropdown = (e) => {
            e.preventDefault();
            setRightMenu(false);
        };

        document.addEventListener('click', closeDropdown);
        document.addEventListener('contextmenu', closeDropdown);

        return () => {
            document.removeEventListener("click", closeDropdown);
            document.removeEventListener("contextmenu", closeDropdown);
        };
    }, [rightMenu]);

    const rightClickHandler = (e) => {
        e.preventDefault();
        const rightDropdown = document.getElementsByClassName('member-card-r-menu');
        const dropdownHeight = 44;
        const clientHeight = document.documentElement.clientHeight;
        const yPosition = e.pageY + dropdownHeight * 3 > clientHeight ? e.pageY - dropdownHeight : e.pageY
        setClickCoords({ position: 'absolute', left: e.pageX + -200 + 'px', top: yPosition + 'px' })
        setRightMenu(true);
    };

    const kickHandler = () => {
        const memberId = member.id;
        const serverId = member.serverId;
        dispatch(deleteMember({ memberId, serverId }));
    };

    return (
        <div onContextMenu={e => rightClickHandler(e)} key={member.id} className='member-card'>
            <img src={member.User.profilePicture} alt='pfp' />
            <div className='member-card-name'>{member.User.username}</div>
            {rightMenu &&
                <div className='member-card-r-menu' style={clickCoords}>
                    {ownerId === server.ownerId && ownerId !== member.id &&
                        <div onClick={() => kickHandler()} className='member-card-r-menu-item red'>Kick {member.User.username}</div>
                    }
                </div>
            }
        </div>
    );
};

export default MemberCard;