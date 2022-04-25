import { csrfFetch } from "./csrf";

export const SET_USER = "session/setUser";
export const REMOVE_USER = "session/removeUser";
const EDIT_USERNAME = 'session/editUsername'

const setUser = (user) => {
  return {
    type: SET_USER,
    user
  };
};

const removeUser = () => {
  return {
    type: REMOVE_USER,
  };
};

const editUsername = (username) => {
  return {
    type: EDIT_USERNAME,
    username
  };
};

export const restoreUser = () => async (dispatch) => {
  const response = await csrfFetch('/api/session');

  if (response.ok) {
    const data = await response.json();
    dispatch(setUser(data.user));
    return true
  }
  return response;
}

export const login = (user) => async (dispatch) => {
  const { credential, password } = user;
  const response = await csrfFetch(`/api/session`, {
    method: 'POST',
    body: JSON.stringify({
      credential,
      password,
    }),
  });
  if (response.ok) {
    const data = await response.json();
    dispatch(setUser(data.user));
  }
  return response;
}

export const signup = (user) => async (dispatch) => {
  const { email, password, username } = user;
  const response = await csrfFetch('/api/users', {
    method: 'POST',
    body: JSON.stringify({
      username,
      email,
      password
    }),
  });
  if (response.ok) {
    const data = await response.json();
    dispatch(setUser(data.user))
  }
  return response;
}

export const logout = () => async (dispatch) => {
  const response = await csrfFetch('/api/session', {
    method: 'DELETE',
  });
  if (response.ok) {
    dispatch(removeUser());
  }
  return response;
};

export const changeUsername = (payload) => async(dispatch) => {
  const { userId } = payload;
  const res = await csrfFetch(`/api/users/${userId}`, {
    method: 'PUT',
    body: JSON.stringify(payload)
  });

  if (res.ok) {
    const username = await res.json();
    dispatch(editUsername(username));
    return username;
  };
  return res;
};

const initialState = { user: null };

const sessionReducer = (state = initialState, action) => {
  let newState = {...state};

  switch (action.type) {
    case SET_USER:
      newState.user = action.user;
      return newState;

    case REMOVE_USER:
      newState.user = null;
      return newState;

    case EDIT_USERNAME:
      newState.user.username = action.username;
      return newState;

    default:
      return newState;
  };
};

export default sessionReducer;
