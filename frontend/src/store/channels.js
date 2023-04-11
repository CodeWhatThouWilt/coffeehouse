import { csrfFetch } from "./csrf";

const ADD_CHANNEL = "channels/addChannel";
const ADD_SERVER_CHANNELS = "channels/addServerChannels";
const UPDATE_CHANNEL = "channels/updateChannel";
const REMOVE_CHANNEL = "channels/removeChannel";

const addChannel = (channel) => {
	return {
		type: ADD_CHANNEL,
		payload: { channel },
	};
};

const addServerChannels = (channels) => {
	return {
		type: ADD_SERVER_CHANNELS,
		payload: { channels },
	};
};

const updateChannel = (channel) => {
	return {
		type: UPDATE_CHANNEL,
		payload: { channel },
	};
};

const removeChannel = (channelId) => {
	return {
		type: REMOVE_CHANNEL,
		payload: { channelId },
	};
};

export const createChannel = (form) => async (dispatch) => {
	const { serverId } = form;
	const res = await csrfFetch(`/api/servers/${serverId}/channels`, {
		method: "POST",
		body: JSON.stringify(form),
	});
	if (res.ok) {
		const channel = await res.json();
		dispatch(addChannel(channel));
		return channel;
	}
	return res;
};

export const getServerChannels = (serverId) => async (dispatch) => {
	const res = await csrfFetch(`/api/servers/${serverId}/channels`);

	if (res.ok) {
		const channels = await res.json();
		dispatch(addServerChannels(channels));
	}
};

export const editChannel = (form) => async (disptach) => {
	const { serverId, channelId } = form;
	const res = await csrfFetch(
		`/api/servers/${serverId}/channels/${channelId}`,
		{
			method: "PUT",
			body: JSON.stringify(form),
		}
	);

	if (res.ok) {
		const channel = await res.json();
		disptach(updateChannel(channel));
	}
	return res;
};

export const deleteChannel = (form) => async (dispatch) => {
	const { serverId, channelId } = form;
	const res = await csrfFetch(
		`/api/servers/${serverId}/channels/${channelId}`,
		{
			method: "DELETE",
			body: JSON.stringify(form),
		}
	);

	if (res.ok) {
		const idData = await res.json();
		dispatch(removeChannel(idData));
	}
	return res;
};

const initialState = {
	byId: {},
	byServerId: [],
};

const channelsReducer = (state = initialState, action) => {
	switch (action.type) {
		case ADD_CHANNEL: {
			const { channel } = action.payload;

			return {
				byId: { ...state.byId, [channel.id]: channel },
				byServerId: {
					...state.byServerId,
					[channel.serverId]: [
						...(state.byServerId[channel.serverId] || []),
						channel.id,
					],
				},
			};
		}
		case ADD_SERVER_CHANNELS: {
			const { channels } = action.payload;

			const channelsById = channels.reduce((acc, channel) => {
				acc[channel.id] = channel;
				return acc;
			}, {});

			const byServerId = { ...state.byServerId };
			channels.forEach((channel) => {
				if (!byServerId[channel.serverId]) {
					byServerId[channel.serverId] = [];
				}
				byServerId[channel.serverId].push(channel.id);
			});

			return {
				byId: { ...state.byId, ...channelsById },
				byServerId,
			};
		}
		case UPDATE_CHANNEL: {
			const { channel } = action.payload;

			return {
				byId: { ...state.byId, [channel.id]: channel },
				byServerId: { ...state.byServerId },
			};
		}
		case REMOVE_CHANNEL: {
			const { channelId } = action.payload;
			const channel = state.byId[channelId];
			if (!channel) return state;

			const remainingChannelsById = { ...state.byId };
			delete remainingChannelsById[channelId];

			const remainingChannelsByServerId = {
				...state.byServerId,
				[channel.serverId]: state.byServerId[channel.serverId].filter(
					(id) => id !== channelId
				),
			};

			return {
				byId: remainingChannelsById,
				byServerId: remainingChannelsByServerId,
			};
		}
		default: {
			return state;
		}
	}
};

export default channelsReducer;
