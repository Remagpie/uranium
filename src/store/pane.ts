import produce from "immer";
import type {VNode} from "preact";
import {createSelector} from "reselect";
import {createAction, createReducer} from "typesafe-actions";
import type {ActionType} from "typesafe-actions";

import {State as RootState, ThunkAction} from "#store";
import {BasePane} from "#types/pane/base";
import LeafPane from "#types/pane/leaf";

type RootHook = (vnode: VNode) => any;
type LeafHook = (vnode: VNode, pane: LeafPane) => any;

export type State = {
	root: BasePane["id"] | null;
	pane: Map<string, BasePane>;
	hook: {
		root: Array<RootHook>;
		leaf: Array<LeafHook>;
	};
};

const initialState: State = {
	root: null,
	pane: new Map(),
	hook: {
		root: [],
		leaf: [],
	},
};

export const selectState = (state: RootState): State => state.pane;
export const selectRootId = createSelector(selectState, (state) => state.root);
export const selectPaneMap = createSelector(selectState, (state) => state.pane);
export const selectPane = (id: string) => (state: RootState) => selectPaneMap(state).get(id);
export const selectRootHook = createSelector(selectState, (state) => state.hook.root);
export const selectLeafHook = createSelector(selectState, (state) => state.hook.leaf);

export const putRoot = createAction("pane/root/put")<State["root"]>();
export const putPane = createAction("pane/put")<BasePane>();
export const putRootHook = createAction("pane/hook/root/put")<RootHook>();
export const deleteRootHook = createAction("pane/hook/root/delete")<RootHook>();
export const putLeafHook = createAction("pane/hook/leaf/put")<LeafHook>();
export const deleteLeafHook = createAction("pane/hook/leaf/delete")<LeafHook>();

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
	| ActionType<typeof deleteRootHook>
	| ActionType<typeof putLeafHook>
	| ActionType<typeof deleteLeafHook>;

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
	"pane/hook/leaf/put": (state, action) => produce(state, (s) => {
		const hook = action.payload;
		s.hook.leaf.push(hook);
	}),
	"pane/hook/leaf/delete": (state, action) => produce(state, (s) => {
		const hook = action.payload;
		s.hook.leaf = s.hook.leaf.filter((h) => h !== hook);
	}),
});
