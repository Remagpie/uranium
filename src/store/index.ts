import {combineReducers, createStore} from "redux";

import * as buffer from "./buffer";

export type State = {
	buffer: buffer.State;
};

const reducer = combineReducers({
	buffer: buffer.reducer,
});

export default createStore(reducer);
