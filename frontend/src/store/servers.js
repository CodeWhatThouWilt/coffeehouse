import { csrfFetch } from './csrf';


const GET_SERVERS = 'servers/getServers';
const ADD_SERVER = 'servers/addServer';
const UPDATE_SERVER = 'servers/updateServer';
const REMOVE_SERVER = 'servers/removeServer';

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

        default:
            return state;
    };
};

export default serversReducer;