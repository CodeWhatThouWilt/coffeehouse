import "./SidebarChannel.css";
import { NavLink } from "react-router-dom";
import { useParams, useHistory } from "react-router-dom";
import { Modal } from "../../context/modal";
import { useState } from "react";
import ChannelSettings from "../ChannelSettings";
import { getChannelMessages } from "../../store/servers";
import { useDispatch, useSelector } from "react-redux";

const SidebarChannel = ({ channel, server }) => {
	const [showModal, setShowModal] = useState(false);
	const [showSettings, setShowSettings] = useState(false);
	const sessionUser = useSelector((state) => state.session.user);

	// const clickHandler = () => {
	//     dispatch(getChannelMessages({ serverId, channelId: channel.id }))
	//         .then(() => history.push(`/channels/${serverId}/${channel.id}`))
	// };

	return (
		<>
			<nav
				onMouseEnter={() => setShowSettings(true)}
				onMouseLeave={() => setShowSettings(false)}
				className="channel-container"
			>
				<NavLink
					to={`/${server.id}/${channel.id}`}
					activeClassName="channel-link-active"
					className="channel-link"
				>
					<div className="channel-name-container">
						<i className="fa-solid fa-hashtag"></i>
						<div>{channel.name}</div>
					</div>
				</NavLink>
				{sessionUser.id === server.ownerId && showSettings && (
					<div
						onClick={() => setShowModal(true)}
						className="edit-channel-icon"
					>
						<i className="fa-solid fa-gear" />
					</div>
				)}
			</nav>
			{showModal && (
				<Modal onClose={() => setShowModal(false)}>
					<ChannelSettings
						channel={channel}
						setShowModal={setShowModal}
					/>
				</Modal>
			)}
		</>
	);
};

export default SidebarChannel;
