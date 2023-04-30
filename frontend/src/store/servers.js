import { csrfFetch } from './csrf';


const GET_SERVERS = 'servers/getServers';
const ADD_SERVER = 'servers/addServer';
const UPDATE_SERVER = 'servers/updateServer';
const REMOVE_SERVER = 'servers/removeServer';

const getServers = (servers) => {
    return {
        type: GET_SERVERS,
        payload: { servers }
    };
};

const addServer = (server) => {
    return {
        type: ADD_SERVER,
        payload: { server }
    };
};

const updateServer = (server) => {
    return {
        type: UPDATE_SERVER,
        payload: { server }
    };
};

const removeServer = (serverId) => {
    return {
        type: REMOVE_SERVER,
        payload: { serverId }
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

export const deleteServer = (serverId) => async (dispatch) => {
    const res = await csrfFetch(`/api/servers/${serverId}`, {
        method: "DELETE"
    });
    

    if (res.ok) {
        const serverId = await res.json();
        dispatch(removeServer(serverId));
    };
};

const initialState = {
    byId: {},
    allIds: []
};

const serversReducer = (state = initialState, action) => {

    switch (action.type) {

        case GET_SERVERS:{
            const { servers } = action.payload

            const serversByIds = servers.reduce((acc, server) => {
                acc[server.id] = server;
                return acc;
            }, {});

            const serversIds = servers.map((server) => server.id);

            return {
                byId: { ...state.byId, ...serversByIds },
                allIds: [...state.allIds, ...serversIds]
            };
        }
        case ADD_SERVER: {
            const { server } = action.payload;

            return {
                byId: { ...state.byId, [server.id]: server },
                allIds: [...state.allIds, server.id]
            };
        }
        case UPDATE_SERVER: {
            const { server } = action.payload;

            return {
                byId: { ...state.byId, [server.id]: server },
                allIds: [...state.allIds]
            };
        }
        case REMOVE_SERVER: {
            const { serverId } = action.payload;

            const remainingServersById = { ...state.byId };
            delete remainingServersById[serverId];

            const remainingServersAllIds = state.allIds.filter((id) => {
                return id !== serverId
            })

            return {
                byId: remainingServersById,
                allIds: remainingServersAllIds
            };
        }
        default: {
            return state;
        }
    };
};

export default serversReducer;