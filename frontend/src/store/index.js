import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import sessionReducer from "./session";
import serversReducer from "./servers";
import channelsReducer from "./channels";
import messagesReducer from "./messages";
import membersReducer from "./members";

const rootReducer = combineReducers({
	session: sessionReducer,
	servers: serversReducer,
	channels: channelsReducer,
	messages: messagesReducer,
	members: membersReducer,
});

const LOGOUT = "LOGOUT";

export const resetState = () => ({
	type: LOGOUT,
});

const appReducer = (state, action) => {
	if (action.type === LOGOUT) {
		state = undefined;
	}
	return rootReducer(state, action);
};

let enhancer;

if (process.env.NODE_ENV === "production") {
	enhancer = applyMiddleware(thunk);
} else {
	const logger = require("redux-logger").default;
	const composeEnhancers =
		window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
	enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
	return createStore(appReducer, preloadedState, enhancer); // Use appReducer instead of rootReducer
};

export default configureStore;
