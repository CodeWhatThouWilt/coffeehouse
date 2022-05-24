import './MemberCard.css';
import { useState, useEffect } from 'react';
import { deleteMember } from '../../store/servers';
import { useDispatch, useSelector } from 'react-redux';
import KickMemberModal from '../KickMemberModal';
import { Modal } from '../../context/modal';
import { io } from 'socket.io-client';
let socket;

const MemberCard = ({ member, server }) => {
    const [rightMenu, setRightMenu] = useState(false);
    const [clickCoords, setClickCoords] = useState({});
    const [showKickModal, setShowKickModal] = useState();
    const [userStatus, setUserStatus] = useState('offline');

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

    useEffect(() => {
        socket = io();
        socket.on(member.userId, status => {
            if (status === 'online') {
                setUserStatus('online');
            };
        });

        return (() => {
            socket.disconnect();
        });
    }, [member.userId]);

    const statusStyling = () => {
        if (userStatus === 'online') {
            return { backgroundColor: "hsl(139, calc(var(--saturation-factor, 1) * 47.3%), 43.9%)"}
        }
    };

    const rightClickHandler = (e) => {
        e.preventDefault();
        const dropdownHeight = 44;
        const clientHeight = document.documentElement.clientHeight;
        const yPosition = e.pageY + dropdownHeight * 3 > clientHeight ? e.pageY - dropdownHeight : e.pageY
        setClickCoords({ position: 'absolute', left: e.pageX + -200 + 'px', top: yPosition + 'px' })
        setRightMenu(true);
    };

    return (
        <>
            <div 
            onContextMenu={e => rightClickHandler(e)} 
            key={member.id} 
            className='member-card'
            style={{ opacity: userStatus === 'offline' && '0.3'}}
            >
                <div>
                    <div className='member-pfp-ctn'>
                        <img src={member.User.profilePicture} alt='pfp' />
                        <div style={statusStyling()} className='member-status-circle'></div>
                    </div>
                </div>

                <div className='member-card-name'>{member.User.username}</div>
                {rightMenu &&
                    <div className='member-card-r-menu' style={clickCoords}>
                        {ownerId === server.ownerId && ownerId !== member.id &&
                            <div onClick={() => setShowKickModal(true)} className='member-card-r-menu-item red'>Kick {member.User.username}</div>
                        }
                    </div>
                }
            </div>
            {showKickModal &&
                <Modal onClose={() => setShowKickModal(false)}>
                    <KickMemberModal member={member} setShowKickModal={setShowKickModal} />
                </Modal>
            }
        </>
    );
};

export default MemberCard;