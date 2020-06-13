import produce from "immer";
import {createSelector} from "reselect";
import {createAction, createReducer} from "typesafe-actions";
import type {ActionType} from "typesafe-actions";

import {BasePane} from "../types/pane/base";
import {State as RootState, ThunkAction} from "./index";

export type State = {
	root: BasePane["id"] | null;
	pane: {
		[key: string]: BasePane;
	};
};

const initialState: State = {
	root: null,
	pane: {},
};

export const selectState = (state: RootState): State => state.pane;
export const selectRootId = createSelector(selectState, (state) => state.root);
export const selectPaneMap = createSelector(selectState, (state) => state.pane);
export const selectPane = (id: BasePane["id"]) => (state: RootState) => selectPaneMap(state)[id];

export const putRoot = createAction("pane/root/put")<State["root"]>();
export const putPane = createAction("pane/put")<BasePane>();

export function patchPane(id: string, callback: (pane: BasePane) => void): ThunkAction<void> {
	return (dispatch, getState) => {
		const state = getState();
		const pane = selectPane(id)(state);

		dispatch(putPane(produce(pane, callback)));
	};
}

export type Action =
	| ActionType<typeof putRoot>
	| ActionType<typeof putPane>;

export const reducer = createReducer<State, Action>(initialState, {
	"pane/root/put": (state, action) => produce(state, (s) => {
		const root = action.payload;
		s.root = root;
	}),
	"pane/put": (state, action) => produce(state, (s) => {
		const pane = action.payload;
		s.pane[pane.id] = pane;
	}),
});
