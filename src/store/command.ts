import produce from "immer";
import {createAction, createReducer} from "typesafe-actions";
import type {ActionType} from "typesafe-actions";

import {State as RootState, ThunkAction} from "#store";
import Command from "#types/command";

export type State = {
	[id: string]: Command;
};

const initialState: State = {};

export const selectState = (state: RootState): State => state.command;
export const selectCommand = (id: string) => (state: RootState) => selectState(state)[id];

export const deleteCommand = createAction("command/delete")<Command["id"]>();
export const putCommand = createAction("command/put")<Command>();

export function runCommand(id: string): ThunkAction<void> {
	return (dispatch, getState) => {
		const state = getState();
		const command = selectCommand(id)(state);
		document.activeElement?.dispatchEvent(new CustomEvent("command", {
			detail: id,
		}));
		// eslint-disable-next-line @typescript-eslint/no-unsafe-return
		return dispatch(command.thunk);
	};
}

export type Action =
	| ActionType<typeof deleteCommand>
	| ActionType<typeof putCommand>;

export const reducer = createReducer<State, Action>(initialState, {
	"command/delete": (state, action) => produce(state, (s) => {
		const id = action.payload;
		delete s[id];
	}),
	"command/put": (state, action) => produce(state, (s) => {
		const command = action.payload;
		s[command.id] = command;
	}),
});
