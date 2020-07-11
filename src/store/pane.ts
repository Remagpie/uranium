import produce from "immer";
import type {VNode} from "preact";
import {createSelector} from "reselect";
import {createAction, createReducer} from "typesafe-actions";
import type {ActionType} from "typesafe-actions";

import {State as RootState, ThunkAction} from "#store";
import {BasePane} from "#types/pane/base";
import StackPane from "#types/pane/stack";
import TabPane from "#types/pane/tab";

type RootHook = (vnode: VNode) => any;

export type State = {
	root: BasePane["id"];
	pane: Map<string, BasePane>;
	hook: {
		root: Array<RootHook>;
	};
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
export const selectRootHook = createSelector(selectState, (state) => state.hook.root);

export const putRoot = createAction("pane/root/put")<State["root"]>();
export const putPane = createAction("pane/put")<BasePane>();
export const putRootHook = createAction("pane/hook/root/put")<RootHook>();
export const deleteRootHook = createAction("pane/hook/root/delete")<RootHook>();

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
	| ActionType<typeof putPane>
	| ActionType<typeof putRootHook>
	| ActionType<typeof deleteRootHook>;

export const reducer = createReducer<State, Action>(initialState, {
	"pane/root/put": (state, action) => produce(state, (s) => {
		const root = action.payload;
		s.root = root;
	}),
	"pane/put": (state, action) => produce(state, (s) => {
		const pane = action.payload;
		s.pane.set(pane.id, pane);
	}),
	"pane/hook/root/put": (state, action) => produce(state, (s) => {
		const hook = action.payload;
		s.hook.root.push(hook);
	}),
	"pane/hook/root/delete": (state, action) => produce(state, (s) => {
		const hook = action.payload;
		s.hook.root = s.hook.root.filter((h) => h !== hook);
	}),
});
