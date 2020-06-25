import produce from "immer";
import {createSelector} from "reselect";
import {createAction, createReducer} from "typesafe-actions";
import type {ActionType} from "typesafe-actions";

import type {State as RootState, ThunkAction} from "#store";
import {runCommand} from "#store/command";
import Command from "#types/command";

export type State = {
	shortcut: Map<string, Command["id"]>;
};

const initialState: State = {
	shortcut: new Map(),
};

// eslint-disable-next-line @typescript-eslint/no-unsafe-return
export const selectState = (state: RootState): State => state.shortcut;
export const selectShortcutMap = createSelector(selectState, (state) => state.shortcut);
export const selectShortcut =
	(key: string) => (state: RootState) => selectShortcutMap(state).get(key);

export const putShortcut = createAction("shortcut/put")<{
	key: string;
	command: Command["id"];
}>();

export function enterKey(code: string): ThunkAction<boolean> {
	return (dispatch, getState) => {
		const state = getState();
		const command = selectShortcut(code)(state);

		if (command != null) {
			dispatch(runCommand(command));
		}

		return command != null;
	};
}

export type Action =
	| ActionType<typeof putShortcut>;

export const reducer = createReducer<State, Action>(initialState, {
	"shortcut/put": (state, action) => produce(state, (s) => {
		const {key, command} = action.payload;
		s.shortcut.set(key, command);
	}),
});
