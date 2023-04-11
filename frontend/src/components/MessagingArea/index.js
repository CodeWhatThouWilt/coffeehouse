import "./MessagingArea.css";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getChannelMessages } from "../../store/messages";
import MessageInputBar from "../MessageInputBar";
import Message from "../Message";
import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import { addMessage } from "../../store/messages";
import { getMessagesByChannel } from "../../store/selectors/messages";
let socket;

const MessagingArea = ({ members, channel, showMembers }) => {
	const dispatch = useDispatch();
	const { serverId, channelId } = useParams();
	const user = useSelector((state) => state.session.user);

    const messages = useSelector(state => getMessagesByChannel(state, channelId))

	useEffect(() => {
		socket = io();
		socket.emit("join_room", channelId);
		socket.on("chat", (chat) => {
			console.log("message", chat);
			dispatch(addMessage(chat));
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
		await socket.emit(`chat`, payload);
		setContent("");
	};

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
				{messages.map((message, i) => (
					<Message
						key={message.id}
						message={message}
						member={members[message.userId]}
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
