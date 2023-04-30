import "./MessagingArea.css";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getChannelMessages } from "../../store/messages";
import MessageInputBar from "../MessageInputBar";
import Message from "../Message";
import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import { addMessage, editMessage } from "../../store/messages";
import { getMessagesByChannel } from "../../store/selectors/messages";
let socket;

const MessagingArea = ({ channel, showMembers }) => {
	const dispatch = useDispatch();
	const { serverId, channelId } = useParams();
	const user = useSelector((state) => state.session.user);
	// const members = useSelector((state) => state.members.byUserId);
    const messages = useSelector(state => getMessagesByChannel(state, channelId));
	const [isLoaded, setIsLoaded] = useState(false);
	
	useEffect(() => {
		dispatch(getChannelMessages({ serverId, channelId }))
		.then(() => setIsLoaded(true));
	}, [dispatch, serverId, channelId]);

	useEffect(() => {
		socket = io();
		socket.emit("join_room", channelId);
		socket.on("chat", (chat) => {
			dispatch(addMessage(chat));
		});

		socket.on("chat edit", (chat) => {
			dispatch(editMessage(chat));
		});

		return () => {
			socket.disconnect();
		};
	}, [dispatch, serverId, channelId]);

	const emitMessage = async (e, message, setContent) => {
		e.preventDefault();
		if (message.length === 0 || message.length > 2000) return;
		const payload = {
			serverId,
			channelId,
			content: message,
		};
		if (serverId !== '1') {
			await socket.emit(`chat`, payload);
		} else {
			await socket.emit(`chat`, payload); 
			await socket.emit(`openAI`, payload);
		}
		setContent("");
	};

	const emitEditMessage = async (message) => {
		if (message.length === 0 || message.length > 2000) return;
		const payload = {
			messageId: message.id,
			serverId,
			channelId,
			content: message.content
		};
		await socket.emit(`chat edit`, payload);
	}

	// TODO implement emitEditMessage

	const stylingHandler = () => {
		if (showMembers) {
			return "messaging-area-container-member-open";
		} else {
			return "messaging-area-container";
		}
	};

	return (
		<div className={stylingHandler()}>
			<div className="messaging-area-list">
				{isLoaded && messages.map((message) => (
					<Message
						key={message.id}
						message={message}
						emitEditMessage={emitEditMessage}
						user={user}
					/>
				))}
			</div>
			<MessageInputBar
				channel={channel}
				showMembers={showMembers}
				emitMessage={emitMessage}
			/>
		</div>
	);
};

export default MessagingArea;
