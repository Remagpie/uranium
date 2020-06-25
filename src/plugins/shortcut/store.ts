import produce from "immer";
import {createAction, createReducer} from "typesafe-actions";
import type {ActionType} from "typesafe-actions";

import type {State as RootState, ThunkAction} from "#store";
import {runCommand} from "#store/command";
import Command from "#types/command";

export type State = {
	[key: string]: Command["id"];
};

const initialState: State = {};

// eslint-disable-next-line @typescript-eslint/no-unsafe-return
export const selectState = (state: RootState): State => state.shortcut;
export const selectBinding = (key: string) => (state: RootState) => selectState(state)[key];

export const putBinding = createAction("shortcut/binding/put")<{
	key: string;
	command: Command["id"];
}>();

export function enterKey(code: string): ThunkAction<boolean> {
	return (dispatch, getState) => {
		const state = getState();
		const command = selectBinding(code)(state);

		if (command != null) {
			dispatch(runCommand(command));
		}

		return command != null;
	};
}

export type Action =
	| ActionType<typeof putBinding>;

export const reducer = createReducer<State, Action>(initialState, {
	"shortcut/binding/put": (state, action) => produce(state, (s) => {
		const {key, command} = action.payload;
		s[key] = command;
	}),
});
