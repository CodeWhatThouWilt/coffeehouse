import './SidebarChannel.css';
import { Link } from 'react-router-dom';
import { useParams, useHistory } from 'react-router-dom';
import { Modal } from '../../context/modal';
import { useState } from 'react';
import ChannelSettings from '../ChannelSettings';
import { getChannelMessages } from '../../store/servers';
import { useDispatch, useSelector } from 'react-redux';

const SidebarChannel = ({ channel, server }) => {
    const { serverId } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    const [showModal, setShowModal] = useState(false);
    const [showSettings, setShowSettings] = useState(false);
    const sessionUser = useSelector(state => state.sessionState.user);

    const clickHandler = () => {
        dispatch(getChannelMessages({ serverId, channelId: channel.id }))
            .then(() => history.push(`/channels/${serverId}/${channel.id}`))
    };

    return (
        <>
            <nav
                onMouseEnter={() => setShowSettings(true)}
                onMouseLeave={() => setShowSettings(false)}
                className='channel-container'>
                <div onClick={clickHandler} className='channel-link'>
                    <div className='channel-name-container'>
                        <i className="fa-solid fa-hashtag edit-channel-icon"></i>
                        <div>{channel.name}</div>
                    </div>
                </div>
                {sessionUser.id === server.ownerId && showSettings &&
                    <div onClick={() => setShowModal(true)}>
                        <i className="fa-solid fa-gear"></i>
                    </div>
                }
            </nav>
            {showModal &&
                <Modal onClose={() => setShowModal(false)}>
                    <ChannelSettings channel={channel} setShowModal={setShowModal} />
                </Modal>
            }
        </>
    );
};

export default SidebarChannel;