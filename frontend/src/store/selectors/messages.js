import { createSelector } from "reselect";

const getMessagesById = (state) => state.messages.byId;
const getMessagesByChannelId = (state) => state.messages.byChannelId;
const getChannelId = (_, channelId) => channelId;

export const getMessagesByChannel = createSelector(
	[getMessagesById, getMessagesByChannelId, getChannelId],
	(byId, byChannelId, channelId) => {
		const messagesIds = byChannelId[channelId] || [];
		return messagesIds.map((id) => byId[id]);
	}
);
