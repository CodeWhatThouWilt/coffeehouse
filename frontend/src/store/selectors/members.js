import { createSelector } from "reselect";

const userState = (state) => state.session.user;
const getMembersById = (state) => state.members.byId;
const getMembersByServerId = (state) => state.members.byServerId;
const getServerId = (_, serverId) => serverId;

export const getMembersByServer = createSelector(
	[getMembersById, getMembersByServerId, getServerId],
	(byId, byServerId, serverId) => {
		const memberIds = byServerId[serverId] || [];
		return memberIds.map((id) => byId[id]);
	}
);

export const getCurrentUserMemberId = createSelector(
	[getMembersById, getMembersByServerId, getServerId, userState],
	(byId, byServerId, serverId, user) => {
		const serverMemberIds = byServerId[serverId];
		return serverMemberIds.find((id) => {
			return byId[id].userId === user.id;
		});
	}
);
