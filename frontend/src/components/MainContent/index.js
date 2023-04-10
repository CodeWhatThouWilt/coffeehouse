import "./MainContent.css";
import MessagingArea from "../MessagingArea";
import MemberArea from "../MemberArea";
import MainContentTopBar from "../MainContentTopBar";
import { getServerMembers } from "../../store/members";
import { useParams } from "react-router-dom";
import { getChannelMessages } from "../../store/messages";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { io } from "socket.io-client";
let socket;

const MainContent = () => {
	const [isLoaded, setIsLoaded] = useState(false);
	const [showMembers, setShowMembers] = useState(false);
	const { serverId, channelId } = useParams();
	const dispatch = useDispatch();

	const { byId: serversById } = useSelector((state) => state.servers);
    const server = serversById[serverId];

	const { byId: channelsById } = useSelector((state) => state.channels);
    const channel = channelsById[channelId];

	const { byId: messagesById, allIds: messagesIds } = useSelector(
        (state) => state.messages
    );

    const { byId: membersById, byServerId: membersByServerId } = useSelector(
		(state) => state.members
	);

    const members = membersByServerId[serverId]
		? membersByServerId[serverId].map((id) => membersById[id])
		: [];


	useEffect(() => {
		dispatch(getServerMembers(serverId))
			.then(() => dispatch(getChannelMessages({ serverId, channelId })))
			.then(() => setIsLoaded(true));
	}, [dispatch, serverId, channelId]);

    // TODO implement sockets for members joining / leaving the server
	// useEffect(() => {
	// 	socket = io();
	// 	socket.on(serverId, (member) => {
	// 		if (member.action === "join") {
	// 			setMembers((members) => [...members, member]);
	// 			membersObj[member.userId] = member;
	// 			setMembersObj((membersObj) => membersObj);
	// 		} else if (member.action === "leave") {
	// 			delete membersObj[member.userId];
	// 			console.log(membersObj);
	// 			setMembers(Object.values(membersObj));
	// 			setMembersObj((membersObj) => membersObj);
	// 		}
	// 	});

	// 	return () => {
	// 		socket.disconnect();
	// 	};
	// }, [serverId, members, membersObj]);

	return (
		<>
        { isLoaded && (
			<div className="main-content-container">
				<MainContentTopBar
					channel={channel}
					setShowMembers={setShowMembers}
					showMembers={showMembers}
				/>
				<div className="main-content-inner-container">
					<MessagingArea
						members={members}
						channel={channel}
						showMembers={showMembers}
					/>
					{showMembers && (
						<MemberArea members={members} server={server} />
					)}
				</div>
			</div>
        )}
		</>
	);
};

export default MainContent;
