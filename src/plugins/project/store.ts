import produce from "immer";
import {createSelector} from "reselect";
import {createAction, createReducer} from "typesafe-actions";
import type {ActionType} from "typesafe-actions";

import type {State as RootState} from "#store";

export type State = {
	project: Map<string, {
		id: string;
		path: string;
	}>;
};

const initialState: State = {
	project: new Map(),
};

// eslint-disable-next-line @typescript-eslint/no-unsafe-return
export const selectState = (state: RootState): State => state.project;
export const selectProjectMap = createSelector(selectState, (state) => state.project);
export const selectProject = (id: string) => (state: RootState) => selectProjectMap(state).get(id);

export const putProject = createAction("project/put")<{
	id: string;
	path: string;
}>();
export const deleteProject = createAction("project/delete")<string>();

export type Action =
	| ActionType<typeof putProject>
	| ActionType<typeof deleteProject>;

export const reducer = createReducer<State, Action>(initialState, {
	"project/put": (state, action) => produce(state, (s) => {
		const project = action.payload;
		s.project.set(project.id, project);
	}),
	"project/delete": (state, action) => produce(state, (s) => {
		const id = action.payload;
		s.project.delete(id);
	}),
});
