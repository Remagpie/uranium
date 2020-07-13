import produce from "immer";
import {createSelector} from "reselect";
import {createAction, createReducer} from "typesafe-actions";
import type {ActionType} from "typesafe-actions";

import {State as RootState, ThunkAction} from "#store";
import {BasePane} from "#types/pane/base";
import StackPane from "#types/pane/stack";
import TabPane from "#types/pane/tab";

export type State = {
	root: BasePane["id"];
	pane: Map<string, BasePane>;
};

const initialState: State = (() => {
	// Insert a default root pane
	const root = new StackPane();

	const tabPane = new TabPane();
	root.children.push(tabPane.id);

	return {
		root: root.id,
		pane: new Map([
			[root.id, root],
			[tabPane.id, tabPane],
		]),
		hook: {
			root: [],
		},
	};
})();

export const selectState = (state: RootState): State => state.pane;
export const selectRootId = createSelector(selectState, (state) => state.root);
export const selectPaneMap = createSelector(selectState, (state) => state.pane);
export const selectPane = (id: string) => (state: RootState) => selectPaneMap(state).get(id);

export const putRoot = createAction("pane/root/put")<State["root"]>();
export const putPane = createAction("pane/put")<BasePane>();

export function patchPane(id: string, callback: (pane: BasePane) => void): ThunkAction<void> {
	return (dispatch, getState) => {
		const state = getState();
		const pane = selectPane(id)(state);

		if (pane == null) {
			// eslint-disable-next-line no-console
			console.error(`Pane with id ${id} doesn't exist!`);
			return;
		}

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
		s.pane.set(pane.id, pane);
	}),
});
