import {combineReducers, createStore} from "redux";

import * as buffer from "./buffer";
import * as pane from "./pane";

export type State = {
	buffer: buffer.State;
	pane: pane.State;
};

const reducer = combineReducers({
	buffer: buffer.reducer,
	pane: pane.reducer,
});

export default createStore(reducer);
