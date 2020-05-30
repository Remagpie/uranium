import produce from "immer";
import {createAction, createReducer} from "typesafe-actions";
import type {ActionType} from "typesafe-actions";

import Command from "../types/command";
import {State as RootState} from "./index";

export type State = {
	[id: string]: Command;
};

const initialState: State = {};

export const selectState = (state: RootState) => state.command;
export const selectCommand = (id: string) => (state: RootState) => selectState(state)[id];

export const putCommand = createAction("command/put")<Command>();

export type Action =
	| ActionType<typeof putCommand>;

export const reducer = createReducer<State, Action>(initialState, {
	"command/put": (state, action) => produce(state, (s) => {
		const command = action.payload;
		s[command.id] = command;
	}),
});
