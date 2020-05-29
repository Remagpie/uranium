import produce from "immer";
import {createSelector} from "reselect";
import {createAction, createReducer} from "typesafe-actions";
import type {ActionType} from "typesafe-actions";

import {Pane} from "../types/pane";
import {State as RootState} from "./index";

export type State = {
	pane: {
		[key: string]: Pane;
	};
};

const initialState: State = {
	pane: {},
};

export const selectState = (state: RootState): State => state.pane;
export const selectPaneMap = createSelector(selectState, (state) => state.pane);
export const selectPaneList = createSelector(selectPaneMap, (pane) => Object.values(pane));

export const putPane = createAction("pane/put")<Pane>();

export type Action =
	| ActionType<typeof putPane>;

export const reducer = createReducer<State, Action>(initialState, {
	"pane/put": (state, action) => produce(state, (s) => {
		const {id, items, active} = action.payload;
		s.pane[id] = {
			id,
			items,
			active,
		};
	}),
});
