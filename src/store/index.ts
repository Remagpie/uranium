import {useDispatch as rawUseDispatch} from "react-redux";
import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from "redux-thunk";
import type {ThunkAction as RawThunkAction, ThunkDispatch} from "redux-thunk";

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
export type ThunkAction<R> = RawThunkAction<R, State, undefined, Action>;
export type AsyncThunkAction<R> = ThunkAction<Promise<R>>;

const reducer = combineReducers({
	buffer: buffer.reducer,
	command: command.reducer,
	pane: pane.reducer,
});

export default createStore(reducer, applyMiddleware(thunk));

export function useDispatch(): ThunkDispatch<State, undefined, Action> {
	return rawUseDispatch();
}
