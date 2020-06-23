import produce from "immer";
import {useDispatch as rawUseDispatch} from "react-redux";
import {applyMiddleware, createStore} from "redux";
import type {AnyAction, Reducer} from "redux";
import thunk from "redux-thunk";
import type {ThunkAction as RawThunkAction, ThunkDispatch} from "redux-thunk";

import * as buffer from "#store/buffer";
import * as command from "#store/command";
import * as pane from "#store/pane";

export type State = {
	buffer: buffer.State;
	command: command.State;
	pane: pane.State;
	[plugin: string]: any;
};

type BuiltinAction = buffer.Action | command.Action | pane.Action;
type Action = BuiltinAction | AnyAction;
export type ThunkAction<R> = RawThunkAction<R, State, undefined, Action>;
export type AsyncThunkAction<R> = ThunkAction<Promise<R>>;

export type Dispatch = ThunkDispatch<State, undefined, Action>;

// TODO: Use a better type for the reducer
const reducerMap: Record<string, Reducer<any, any>> = {
	buffer: buffer.reducer,
	command: command.reducer,
	pane: pane.reducer,
};

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
function reducer(state: State = {} as any, action: Action) {
	return produce(state, (s) => {
		for (const [key, childReducer] of Object.entries(reducerMap)) {
			// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
			s[key] = childReducer(s[key], action as any);
		}
	});
}

// TODO: Use a better type for the reducer
export function putReducer(name: string, childReducer: Reducer<any, any>): ThunkAction<void> {
	return (dispatch) => {
		reducerMap[name] = childReducer;
		dispatch({type: name + "/init"});
	};
}

export function deleteReducer(name: string): ThunkAction<void> {
	return (dispatch) => {
		delete reducerMap[name];
		dispatch({type: name + "/destroy"});
	};
}

export default createStore(reducer, applyMiddleware(thunk));

export function useDispatch(): Dispatch {
	return rawUseDispatch();
}
