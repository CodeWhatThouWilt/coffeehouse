import { csrfFetch } from './csrf';


const GET_SERVERS = 'servers/getServers';
const ADD_SERVER = 'servers/addServer';
const UPDATE_SERVER = 'servers/updateServer';
const REMOVE_SERVER = 'servers/removeServer';
const ADD_CHANNEL = 'servers/addChannel';
const UPDATE_CHANNEL = 'servers/updateChannel';
const REMOVE_CHANNEL = 'servers/removeChannel';
const GET_MESSAGES = 'servers/getMessages'
const ADD_MESSAGE = 'servers/addMessage';
const EDIT_MESSAGE = 'servers/editMessage';
const GET_MEMBERS = 'servers/getMembers';
const REMOVE_MEMBER = 'servers/removeMember';
const LEAVE_SERVER = 'servers/leaveServer';

// TODO rework entire state to match something similar to channels state

const getServers = (servers) => {
    return {
        type: GET_SERVERS,
        servers
    };
};

const addServer = (server) => {
    return {
        type: ADD_SERVER,
        server
    };
};

const updateServer = (server) => {
    return {
        type: UPDATE_SERVER,
        server
    };
};

const removeServer = (serverId) => {
    return {
        type: REMOVE_SERVER,
        serverId
    };
};

const addChannel = (channel) => {
    return {
        type: ADD_CHANNEL,
        channel
    };
};

const updateChannel = (channel) => {
    return {
        type: UPDATE_CHANNEL,
        channel
    };
};

const removeChannel = (idData) => {
    return {
        type: REMOVE_CHANNEL,
        idData
    };
};

const getMessages = (payload) => {
    return {
        type: GET_MESSAGES,
        payload
    };
};

export const addMessage = (message) => {
    return {
        type: ADD_MESSAGE,
        message
    };
};

const editMessage = (message) => {
    return {
        type: EDIT_MESSAGE,
        message
    };
};

const getMembers = (payload) => {
    return {
        type: GET_MEMBERS,
        payload
    };
};

const removeMember = (payload) => {
    return {
        type: REMOVE_MEMBER,
        payload
    };
};

const leaveServer = (payload) => {
    return {
        type: LEAVE_SERVER,
        payload
    };
};

export const getUserServers = () => async(dispatch) => {
    const res = await csrfFetch('/api/servers');

    if (res.ok) {
        const servers = await res.json();
        dispatch(getServers(servers));
    };
};

export const createServer = (form) => async(dispatch) => {
    const res = await csrfFetch('/api/servers', {
        method: 'POST',
        headers: {
            "Content-Type": "multipart/form-data",
        },
        body: form
    });

    if (res.ok) {
        const server = await res.json();
        dispatch(addServer(server));
        return server;
    };
    return res;
};

export const editServer = (form, serverId) => async(dispatch) => {
    const res = await csrfFetch(`/api/servers/${serverId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "multipart/form-data",
        },
        body: form
    });

    if (res.ok) {
        const server = await res.json();
        dispatch(updateServer(server));
    };
    return res;
};

export const deleteServer = (serverId) => async(dispatch) => {
    const res = await csrfFetch(`/api/servers/${serverId}`, {
        method: "DELETE"
    });
    

    if (res.ok) {
        const serverId = await res.json();
        dispatch(removeServer(serverId));
    };
};

export const createChannel = (form) => async(dispatch) => {
    const { serverId } = form;
    const res = await csrfFetch(`/api/servers/${serverId}/channels`, {
        method: "POST",
        body: JSON.stringify(form)
    });
    if (res.ok) {
        const channel = await res.json();
        dispatch(addChannel(channel));
        return channel;
    };
    return res;
};

export const editChannel = (form) => async(disptach) => {
    const { serverId, channelId } = form;
    const res = await csrfFetch(`/api/servers/${serverId}/channels/${channelId}`, {
        method: "PUT",
        body: JSON.stringify(form)
    });

    if (res.ok) {
        const channel = await res.json();
        disptach(updateChannel(channel));
    };
    return res;
};

export const deleteChannel = (form) => async(dispatch) => {
    const { serverId, channelId } = form;
    const res = await csrfFetch(`/api/servers/${serverId}/channels/${channelId}`, {
        method: "DELETE",
        body: JSON.stringify(form)
    });

    if (res.ok) {
        const idData = await res.json();
        dispatch(removeChannel(idData));
    }
    return res
};

export const getChannelMessages = (idData) => async(dispatch) => {
    const { serverId, channelId } = idData;
    const res = await csrfFetch(`/api/servers/${serverId}/channels/${channelId}/messages`);

    if (res.ok) {
        const payload = await res.json();
        dispatch(getMessages(payload));
    };
};

export const createMessage = (form) => async(dispatch) => {
    const { serverId, channelId } = form;
    const res = await csrfFetch(`/api/servers/${serverId}/channels/${channelId}/messages`, {
        method: "POST",
        body: JSON.stringify(form)
    });

    if (res.ok) {
        const message = await res.json();
        dispatch(addMessage(message));
        return message;
    };
    return res;
};

export const getServerMembers = (serverId) => async(dispatch) => {
    const res = await csrfFetch(`/api/servers/${serverId}/members`);
    
    if (res.ok) {
        const payload = await res.json();
        dispatch(getMembers(payload));
        return payload;
    };
};

export const deleteMember = (payload) => async(dispatch) => {
    const { serverId, memberId } = payload;
    const res = await csrfFetch(`/api/servers/${serverId}/members/${memberId}`, {
        method: 'DELETE'
    });

    if (res.ok) {
        const payload = await res.json();
        dispatch(removeMember(payload));
    };
};

export const exitServer = (payload) => async(dispatch) => {
    const { serverId, memberId } = payload;
    const res = await csrfFetch(`/api/servers/${serverId}/members/${memberId}`, {
        method: "DELETE"
    });

    if (res.ok) {
        const data = await res.json();
        dispatch(leaveServer(data));
    };
};

const initialState = {};

const serversReducer = (state = initialState, action) => {
    let newState = {...state};

    switch (action.type) {

        case GET_SERVERS:
            newState = action.servers;
            return newState;
        
        case ADD_SERVER:
            newState[action.server.id] = action.server;
            return newState;

        case UPDATE_SERVER:
            newState[action.server.id].iconURL = action.server.iconURL;
            newState[action.server.id].name = action.server.name;
            return newState;

        case REMOVE_SERVER:
            delete newState[action.serverId];
            return newState;

        case ADD_CHANNEL:
            newState[action.channel.serverId].Channels[action.channel.id] = action.channel;
            return newState;

        case UPDATE_CHANNEL:
            newState[action.channel.serverId].Channels[action.channel.id] = action.channel;
            return newState;

        case REMOVE_CHANNEL:
            delete newState[action.idData.serverId].Channels[action.idData.channelId];
            return newState;

        case GET_MESSAGES:
            newState[action.payload.serverId].Channels[action.payload.channelId].Messages = action.payload.messages;
            return newState;

        case ADD_MESSAGE:
            newState[action.message.serverId].Channels[action.message.channelId].Messages[action.message.id] = action.message;
            return newState;

        case EDIT_MESSAGE:
            newState[action.message.serverId].Channels[action.mesage.channelId].Messages[action.message.id] = action.message;
            return newState;

        case GET_MEMBERS:
            newState[action.payload.serverId].Members = action.payload.members;
            return newState;

        case REMOVE_MEMBER:
            delete newState[action.payload.serverId].Members[action.payload.userId];
            return newState;

        case LEAVE_SERVER:
            delete newState[action.payload.serverId];
            return newState;

        default:
            return state;
    };
};

export default serversReducer;