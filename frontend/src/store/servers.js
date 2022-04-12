import { csrfFetch } from './csrf';


const GET_SERVERS = 'servers/getServers';

const getServers = (servers) => {
    return {
        type: GET_SERVERS,
        servers
    };
};

export const getUserServers = () => async(dispatch) => {
    const res = await csrfFetch('/api/servers');

    if (res.ok) {
        const servers = await res.json();
        console.log(servers)
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
    };
};

export default serversReducer;