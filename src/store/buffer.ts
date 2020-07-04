import produce from "immer";
import {createSelector} from "reselect";
import {createAction, createReducer} from "typesafe-actions";
import type {ActionType} from "typesafe-actions";

import type {State as RootState, ThunkAction} from "#store";
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

export function patchBuffer<B extends BaseBuffer>(
	id: string,
	callback: (buffer: B) => void,
): ThunkAction<void> {
	return (dispatch, getState) => {
		const state = getState();
		const buffer = selectBuffer(id)(state);

		if (buffer == null) {
			// eslint-disable-next-line no-console
			console.error(`Buffer with id ${id} doesn't exist!`);
			return;
		}

		dispatch(putBuffer(produce(buffer, callback)));
	};
}

export type Action =
	| ActionType<typeof putBuffer>;

export const reducer = createReducer<State, Action>(initialState, {
	"buffer/put": (state, action) => produce(state, (s) => {
		const buffer = action.payload;
		s.buffer.set(buffer.id, buffer);
	}),
});
