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
            <div>
                <Link to={`/channels/${serverId}/${channel.id}`}>
                    <div key={channel.id} >{channel.name}</div>
                </Link>
                <div onClick={() => setShowModal(true)}>
                    <i className="fa-solid fa-gear"></i>
                </div>
            </div>
            {showModal &&
                <Modal onClose={() => setShowModal(false)}>
                    <ChannelSettings channel={channel} setShowModal={setShowModal} />
                </Modal>
            }
        </>
    );
};

export default SidebarChannel;