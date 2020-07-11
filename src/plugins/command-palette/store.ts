import produce from "immer";
import {createSelector} from "reselect";
import {createAction, createReducer} from "typesafe-actions";
import type {ActionType} from "typesafe-actions";

import type {State as RootState, ThunkAction} from "#store";
import * as paneStore from "#store/pane";
import type FloatPane from "#types/pane/float";

export type State = {
	pane?: FloatPane["id"];
};

const initialState: State = {};

// eslint-disable-next-line @typescript-eslint/no-unsafe-return
export const selectState = (state: RootState): State => state["command-palette"];
export const selectPaneId = createSelector(selectState, (state) => state.pane);

export function showPane(): ThunkAction<void> {
	return (dispatch, getState) => {
		const state = getState();
		const id = selectPaneId(state);
		if (id == null) {
			return;
		}

		dispatch(paneStore.patchPane(id, (pane) => { pane.display = true; }));
	};
}

export function hidePane(): ThunkAction<void> {
	return (dispatch, getState) => {
		const state = getState();
		const id = selectPaneId(state);
		if (id == null) {
			return;
		}

		dispatch(paneStore.patchPane(id, (pane) => { pane.display = false; }));
	};
}

export function togglePane(): ThunkAction<void> {
	return (dispatch, getState) => {
		const state = getState();
		const id = selectPaneId(state);
		if (id == null) {
			return;
		}

		const pane = paneStore.selectPane(id)(state);
		if (pane == null) {
			return;
		}

		dispatch(pane.display ? hidePane() : showPane());
	};
}

export const putPane = createAction("command-palette/pane/put")<FloatPane["id"]>();

export type Action = ActionType<typeof putPane>;

export const reducer = createReducer<State, Action>(initialState, {
	"command-palette/pane/put": (state, action) => produce(state, (s) => {
		const id = action.payload;
		s.pane = id;
	}),
});
