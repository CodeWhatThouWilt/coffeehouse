import "./DeleteChannelModal.css";
import { useDispatch } from "react-redux";
import { deleteChannel } from "../../store/channels";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

const DeleteChannelModal = ({ channel, setShowDeleteModal }) => {
	const dispatch = useDispatch();
	const history = useHistory();
	const servers = useSelector((state) => state.servers);
	const server = servers[channel.serverId];
	const channels = Object.values(server.Channels);

	const deleteHandler = () => {
		dispatch(
			deleteChannel({
				channelId: channel.id,
				serverId: channel.serverId,
			})
		);
		history.push(`/channels/${channel.serverId}/`);
	};

	return (
		<div className="delete-channel-container">
			<div className="delete-server-header">Delete Channel</div>
			<div className="delete-server-middle">
				<div className="delete-channel-subtext">
					Are you sure you want to delete{" "}
					<span className="delete-server-name">{channel.name}</span>?
					This cannot be undone.
				</div>
			</div>
			<div className="delete-server-bottom">
				<div
					onClick={() => setShowDeleteModal(false)}
					className="delete-server-cancel"
				>
					Cancel
				</div>
				<button
					onClick={() => deleteHandler()}
					className="delete-server-submit"
				>
					Delete Channel
				</button>
			</div>
		</div>
	);
};

export default DeleteChannelModal;
