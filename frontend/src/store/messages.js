import { csrfFetch } from "./csrf";

const GET_MESSAGES = "servers/getMessages";
const ADD_MESSAGE = "servers/addMessage";
const EDIT_MESSAGE = "servers/editMessage";

const getMessages = (messages) => {
	return {
		type: GET_MESSAGES,
		payload: { messages },
	};
};

export const addMessage = (message) => {
	return {
		type: ADD_MESSAGE,
		payload: { message },
	};
};

export const editMessage = (message) => {
	return {
		type: EDIT_MESSAGE,
		payload: { message },
	};
};

export const createMessage = (form) => async (dispatch) => {
	const { serverId, channelId } = form;
	const res = await csrfFetch(
		`/api/servers/${serverId}/channels/${channelId}/messages`,
		{
			method: "POST",
			body: JSON.stringify(form),
		}
	);

	if (res.ok) {
		const message = await res.json();
		dispatch(addMessage(message));
		return message;
	}
	return res;
};

export const getChannelMessages = (idData) => async (dispatch) => {
	const { serverId, channelId } = idData;
	const res = await csrfFetch(
		`/api/servers/${serverId}/channels/${channelId}/messages`
	);

	if (res.ok) {
		const payload = await res.json();
		dispatch(getMessages(payload));
	}
};

const initialState = {
	byId: {},
	byChannelId: {},
	allIds: [],
};

const messagesReducer = (state = initialState, action) => {
    
	switch (action.type) {
		case GET_MESSAGES: {
			const { messages } = action.payload;

			const messagesById = messages.reduce((acc, message) => {
				acc[message.id] = message;
				return acc;
			}, {});

			const messagesByChannelId = messages.reduce((acc, message) => {
				acc[message.channelId] = message;
				return acc;
			}, {});

			const messagesIds = messages.map((message) => message.id);

			return {
				byId: { ...state.byId, ...messagesById },
				byChannelId: { ...state.byChannelId, ...messagesByChannelId },
				allIds: [...state.allIds, ...messagesIds],
			};
		}
		case ADD_MESSAGE: {
			const { message } = action.payload;

			return {
				byId: { ...state.byId, [message.id]: message },
				byChannelId: { ...state.byId, [message.channelId]: message },
				allIds: [...state.allIds, message.id],
			};
		}
		case EDIT_MESSAGE: {
			const { message } = action.payload;

			return {
				byId: { ...state.byId, [message.id]: message },
				byChannelId: { ...state.byId, [message.channelId]: message },
				allIds: [...state.allIds],
			};
		}

		default: {
			return state;
		}
	}
};

export default messagesReducer;
