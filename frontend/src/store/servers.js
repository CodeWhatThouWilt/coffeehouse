import { csrfFetch } from './csrf';


const GET_SERVERS = 'servers/getServers';
const ADD_SERVER = 'servers/addServer';
const UPDATE_SERVER = 'servers/updateServer';
const REMOVE_SERVER = 'servers/removeServer';
const ADD_CHANNEL = 'servers/addChannel';
const UPDATE_CHANNEL = 'servers/updateChannel';
const REMOVE_CHANNEL = 'servers/REMOVE_CHANNEL';

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
    }
}

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
            newState[action.server.id] = action.server;
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

        default:
            return state;
    };
};

export default serversReducer;