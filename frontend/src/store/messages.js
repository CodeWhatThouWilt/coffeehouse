import { csrfFetch } from "./csrf";

const GET_MESSAGES = "servers/getMessages";
const ADD_MESSAGE = "servers/addMessage";
const EDIT_MESSAGE = "servers/editMessage";
const DELETE_MESSAGE = "servers/deleteMessage";

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

export const deleteMessage = (messageId, channelId) => {
	return {
		type: DELETE_MESSAGE,
		payload: { messageId, channelId }
	}
}

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
				if (!acc[message.channelId]) {
					acc[message.channelId] = [];
				}
				acc[message.channelId].push(message.id);
				return acc;
			}, {});

			return {
				byId: { ...state.byId, ...messagesById },
				byChannelId: { ...state.byChannelId, ...messagesByChannelId },
			};
		}
		case ADD_MESSAGE: {
			const { message } = action.payload;

			return {
				byId: { ...state.byId, [message.id]: message },
				byChannelId: {
					...state.byChannelId,
					[message.channelId]: state.byChannelId[message.channelId]
						? [...state.byChannelId[message.channelId], message.id]
						: [message.id],
				},
			};
		}
		case EDIT_MESSAGE: {
			const { message } = action.payload;

			return {
				byId: { ...state.byId, [message.id]: message },
				byChannelId: { ...state.byChannelId },
			};
		}
		case DELETE_MESSAGE: {
			const { messageId, channelId } = action.payload;

			const newById = { ...state.byId };
			delete newById[messageId];

			const newByChannelId = { ...state.byChannelId };
			newByChannelId[channelId] = newByChannelId[channelId].filter(
				(id) => id !== messageId
			);

			return {
				byId: newById,
				byChannelId: newByChannelId,
			};
		}

		default: {
			return state;
		}
	}
};

export default messagesReducer;
