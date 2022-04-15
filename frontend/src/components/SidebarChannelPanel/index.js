import './SidebarChannelPanel.css';
import { useParams, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { Modal } from '../../context/modal';
import CreateChannelForm from '../CreateChannelForm';
import SidebarChannel from '../SidebarChannel';

const SidebarChannelPanel = () => {
    const { serverId } = useParams();
    const [showModal, setShowModal] = useState(false);
    const servers = useSelector(state => state.serversState);
    const server = servers[serverId];

    let channels;
    let channelsArr;
    if (server) {
        channels = server.Channels;
        channelsArr = Object.values(channels);
    }


    return server && (
        <>
            <div className='sb-channel-panel-container'>
                <div>
                    <div>TEXT CHANNELS</div>
                    <div onClick={() => setShowModal(true)}>
                        <i className="fa-solid fa-plus"></i>
                    </div>
                </div>
                <div>
                    {channelsArr.map(channel => (
                        <SidebarChannel key={channel.id} channel={channel} />
                    ))}
                </div>
            </div>
            {showModal &&
                <Modal onClose={() => setShowModal(false)}>
                    <CreateChannelForm />
                </Modal>
            }
        </>
    );
};

export default SidebarChannelPanel;