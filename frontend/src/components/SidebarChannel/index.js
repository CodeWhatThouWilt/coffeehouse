import './SidebarChannel.css';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { Modal } from '../../context/modal';
import { useState } from 'react';
import ChannelSettings from '../ChannelSettings';

const SidebarChannel = ({ channel }) => {
    const { serverId } = useParams();
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <nav className='channel-container'>
                <Link to={`/channels/${serverId}/${channel.id}`} className='channel-link'>
                    <div className='channel-name-container'>
                        <i className="fa-solid fa-hashtag edit-channel-icon"></i>
                        <div>{channel.name}</div>
                    </div>
                </Link>
                <div onClick={() => setShowModal(true)}>
                    <i className="fa-solid fa-gear"></i>
                </div>
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