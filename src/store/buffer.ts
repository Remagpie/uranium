import produce from "immer";
import {createAction, createReducer} from "typesafe-actions";
import type {ActionType} from "typesafe-actions";

import type {TextBuffer} from "../types/buffer";

export type State = {
	[key: string]: TextBuffer;
};

const initialState: State = {};

export const setBuffer = createAction("buffer/set")<{
	id: string;
}>();

export type Action =
	| ActionType<typeof setBuffer>;

export const reducer = createReducer<State, Action>(initialState, {
	"buffer/set": (state, action) => produce(state, (s) => {
		const {id} = action.payload;
		s[id] = {
			id,
		};
	}),
});
