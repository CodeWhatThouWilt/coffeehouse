import './MemberCard.css';
import { useState, useEffect } from 'react';
import { deleteMember } from '../../store/servers';
import { useDispatch } from 'react-redux';
import KickMemberModal from '../KickMemberModal';
import Modal from '../../context/modal';

const MemberCard = ({ member }) => {
    const [rightMenu, setRightMenu] = useState(false);
    const dispatch = useDispatch();
    let clickCoords = {};

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
        clickCoords = { position: 'absolute', bottom: e.clientX + 'px', right: e.clientY + 'px' }
        console.log(clickCoords);
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
                    <div className='member-card-r-menu-item red'>Kick {member.User.username}</div>
                </div>
            }
        </div>
    );
};

export default MemberCard;