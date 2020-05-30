import {useDispatch as rawUseDispatch} from "react-redux";
import {combineReducers, createStore} from "redux";
import type {Dispatch} from "redux";

import * as buffer from "./buffer";
import * as command from "./command";
import * as pane from "./pane";

export type State = {
	buffer: buffer.State;
	command: command.State;
	pane: pane.State;
};

type Action =
	| buffer.Action
	| command.Action
	| pane.Action;

const reducer = combineReducers({
	buffer: buffer.reducer,
	command: command.reducer,
	pane: pane.reducer,
});

export default createStore(reducer);

export function useDispatch(): Dispatch<Action> {
	return rawUseDispatch();
}
