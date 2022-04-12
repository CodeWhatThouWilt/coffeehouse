import { csrfFetch } from './csrf';


const GET_SERVERS = 'servers/getServers';

const getServers = (servers) => {
    return {
        type: GET_SERVERS,
        servers
    };
};

export const getUserServers = () => async(dispatch) => {
    console.log('here')
    const res = await csrfFetch('/api/servers');

    if (res.ok) {
        const servers = await res.json();
        dispatch(getServers(servers));
    };
};


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