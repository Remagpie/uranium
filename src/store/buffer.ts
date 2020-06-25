import produce from "immer";
import {createSelector} from "reselect";
import {createAction, createReducer} from "typesafe-actions";
import type {ActionType} from "typesafe-actions";

import type {State as RootState} from "#store";
import type {BaseBuffer} from "#types/buffer/base";

export type State = {
	buffer: Map<string, BaseBuffer>;
};

const initialState: State = {
	buffer: new Map(),
};

export const selectState = (state: RootState): State => state.buffer;
export const selectBufferMap = createSelector(selectState, (state) => state.buffer);
export const selectBuffer = (id: string) => (state: RootState) => selectBufferMap(state).get(id);

export const putBuffer = createAction("buffer/put")<BaseBuffer>();

export type Action =
	| ActionType<typeof putBuffer>;

export const reducer = createReducer<State, Action>(initialState, {
	"buffer/put": (state, action) => produce(state, (s) => {
		const buffer = action.payload;
		s.buffer.set(buffer.id, buffer);
	}),
});
