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
	allIds: [],
};

const channelsReducer = (state = initialState, action) => {

	switch (action.type) {
		case ADD_CHANNEL:
			const { channel } = action.payload;

			return {
				byId: { ...state.byId, [channel.id]: channel },
				allIds: [...state.allIds, channel.id],
			};

		case ADD_SERVER_CHANNELS: {
			const { channels } = action.payload;

			const channelsById = channels.reduce((acc, channel) => {
				acc[channel.id] = channel;
				return acc;
			}, {});

			const channelsIds = channels.map((channel) => channel.id);

			return {
				byId: { ...state.byId, ...channelsById },
				allIds: [...state.allIds, ...channelsIds],
			};
		}
		case UPDATE_CHANNEL: {
			const { channel } = action.payload;

			return {
				byId: { ...state.byId, [channel.id]: channel },
				allIds: [...state.allIds],
			};
		}
		case REMOVE_CHANNEL: {
			const { channelId } = action.payload;

			const remainingChannelsById = { ...state.byId };
			delete remainingChannelsById[channelId];
			// alternatively named destructure / spread
			// const { [channelId]: removedChannel, ...remainingChannels } = state.byId
			const remainingChannelsAllIds = state.allIds.filter((id) => {
				return id !== channelId
			});

			return {
				byId: remainingChannelsById,
				allIds: remainingChannelsAllIds,
			};
		}
		default: {
			return state;
		}
	}
};

export default channelsReducer;
