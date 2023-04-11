import "./SidebarChannelPanel.css";
import { useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { Modal } from "../../context/modal";
import CreateChannelForm from "../CreateChannelForm";
import SidebarChannel from "../SidebarChannel";
import { getChannelsByServer } from "../../store/selectors/channels";
import { getServerChannels } from "../../store/channels";

const SidebarChannelPanel = () => {
	const dispatch = useDispatch();
	const { serverId } = useParams();
	const [showModal, setShowModal] = useState(false);
	const [isLoaded, setIsLoaded] = useState(false)

	const { byId: serversById } = useSelector((state) => state.servers);
	const server = serversById[serverId];

	const channels = useSelector((state) => getChannelsByServer(state, serverId))

	useEffect(() => {
		dispatch(getServerChannels(serverId))
		.then(() => setIsLoaded(true));
	}, [dispatch, serverId]);

	return (
		server && isLoaded && (
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
