import { createSelector } from "reselect";

const getChannelsById = (state) => state.channels.byId;
const getChannelsByServerId = (state) => state.channels.byServerId;
const getServerId = (_, serverId) => serverId;

export const getChannelsByServer = createSelector(
	[getChannelsById, getChannelsByServerId, getServerId],
	(byId, byServerId, serverId) => {
		const channelIds = byServerId[serverId] || [];
		return channelIds.map((id) => byId[id]);
	}
);
