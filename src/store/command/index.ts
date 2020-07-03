import produce from "immer";
import {createSelector} from "reselect";
import {createAction, createReducer} from "typesafe-actions";
import type {ActionType} from "typesafe-actions";

import {State as RootState, ThunkAction} from "#store";
import Command from "#types/command";
import * as bufferCommand from "./buffer";
import * as coreCommand from "./core";

export type State = {
	command: Map<string, Command>;
};

const initialState: State = (() => {
	const state = {
		command: new Map(),
	};

	for (const command of Object.values(bufferCommand)) {
		state.command.set(command.id, command);
	}
	for (const command of Object.values(coreCommand)) {
		state.command.set(command.id, command);
	}

	return state;
})();

export const selectState = (state: RootState): State => state.command;
export const selectCommandMap = createSelector(selectState, (state) => state.command);
export const selectCommand = (id: string) => (state: RootState) => selectCommandMap(state).get(id);

export const deleteCommand = createAction("command/delete")<Command["id"]>();
export const putCommand = createAction("command/put")<Command>();

export function runCommand(id: string): ThunkAction<any> {
	return (dispatch, getState): any => {
		const state = getState();
		const command = selectCommand(id)(state);

		if (command == null) {
			// eslint-disable-next-line no-console
			console.error(`Command ${id} doesn't exist!`);
			return;
		}

		document.activeElement?.dispatchEvent(new CustomEvent("command", {
			bubbles: true,
			detail: id,
		}));
		// eslint-disable-next-line consistent-return, @typescript-eslint/no-unsafe-return
		return dispatch(command.action);
	};
}

export type Action =
	| ActionType<typeof deleteCommand>
	| ActionType<typeof putCommand>;

export const reducer = createReducer<State, Action>(initialState, {
	"command/delete": (state, action) => produce(state, (s) => {
		const id = action.payload;
		s.command.delete(id);
	}),
	"command/put": (state, action) => produce(state, (s) => {
		const command = action.payload;
		s.command.set(command.id, command);
	}),
});
