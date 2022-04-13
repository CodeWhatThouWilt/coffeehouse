import { csrfFetch } from './csrf';


const GET_SERVERS = 'servers/getServers';
const ADD_SERVER = 'servers/addServer';

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
        body: form
    });

    if (res.ok) {
        const server = res.json();
        dispatch(addServer(server));
    };
    return res;
}


const initialState = {};

const serversReducer = (state = initialState, action) => {
    let newState = {...state};

    switch (action.type) {

        case GET_SERVERS:
            newState = action.servers;
            return newState;
        
        default:
            return state;
    };
};

export default serversReducer;