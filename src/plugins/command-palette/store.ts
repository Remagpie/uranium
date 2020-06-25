import produce from "immer";
import {createSelector} from "reselect";
import {createAction, createReducer} from "typesafe-actions";
import type {ActionType} from "typesafe-actions";

import type {State as RootState} from "#store";

export type State = {
	show: boolean;
};

const initialState: State = {
	show: false,
};

// eslint-disable-next-line @typescript-eslint/no-unsafe-return
export const selectState = (state: RootState): State => state["command-palette"];
export const selectShow = createSelector(selectState, (state) => state.show);

export const putShow = createAction("command-palette/show/put")<boolean>();
export const toggleShow = createAction("command-palette/show/toggle")();

export type Action =
	| ActionType<typeof putShow>
	| ActionType<typeof toggleShow>;

export const reducer = createReducer<State, Action>(initialState, {
	"command-palette/show/put": (state, action) => produce(state, (s) => {
		const show = action.payload;
		s.show = show;
	}),
	"command-palette/show/toggle": (state) => produce(state, (s) => {
		s.show = !s.show;
	}),
});
