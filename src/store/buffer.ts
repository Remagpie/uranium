import produce from "immer";
import {createAction, createReducer} from "typesafe-actions";
import type {ActionType} from "typesafe-actions";

import type {BaseBuffer} from "../types/buffer/base";
import type {State as RootState} from "./index";

export type State = {
	[id: string]: BaseBuffer;
};

const initialState: State = {};

export const selectState = (state: RootState): State => state.buffer;
export const selectBuffer = (id: BaseBuffer["id"]) => (state: RootState) => selectState(state)[id];

export const putBuffer = createAction("buffer/put")<BaseBuffer>();

export type Action =
	| ActionType<typeof putBuffer>;

export const reducer = createReducer<State, Action>(initialState, {
	"buffer/put": (state, action) => produce(state, (s) => {
		const buffer = action.payload;
		s[buffer.id] = buffer;
	}),
});
