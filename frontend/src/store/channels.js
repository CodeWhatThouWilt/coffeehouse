import { csrfFetch } from "./csrf";

const ADD_CHANNEL = "channels/addChannel";
const UPDATE_CHANNEL = "channels/updateChannel";
const REMOVE_CHANNEL = "channels/removeChannel";

const addChannel = (channel) => {
	return {
		type: ADD_CHANNEL,
		channel,
	};
};

const updateChannel = (channel) => {
	return {
		type: UPDATE_CHANNEL,
		channel,
	};
};

const removeChannel = (idData) => {
	return {
		type: REMOVE_CHANNEL,
		idData,
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
