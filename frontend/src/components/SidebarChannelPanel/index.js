import "./SidebarChannelPanel.css";
import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import { Modal } from "../../context/modal";
import CreateChannelForm from "../CreateChannelForm";
import SidebarChannel from "../SidebarChannel";

const SidebarChannelPanel = () => {
	const { serverId } = useParams();
	const [showModal, setShowModal] = useState(false);

	const { byId: serversById } = useSelector((state) => state.servers);
	const server = serversById[serverId];

	const { byId: channelsById, allIds: channelsIds} = useSelector((state) => {
		return state.channels;
	});

	const channels = channelsIds.map((id) => {
		return channelsById[id].serverId === parseInt(serverId)
	})

	return (
		server && (
			<form>
				<div className="channel-panel-container">
					<div className="channel-panel-category-header-container">
						<div className="channel-panel-category-header">
							TEXT CHANNELS
						</div>
						<div
							onClick={() => setShowModal(true)}
							className="add-channel-icon"
						>
							<i className="fa-solid fa-plus"></i>
						</div>
					</div>
					<div className="channel-panel-channel-list">
						{channels.map((channel) => (
							<SidebarChannel
								key={channel.id}
								channel={channel}
								server={server}
							/>
						))}
					</div>
				</div>
				{showModal && (
					<Modal onClose={() => setShowModal(false)}>
						<CreateChannelForm setShowModal={setShowModal} />
					</Modal>
				)}
			</form>
		)
	);
};

export default SidebarChannelPanel;
