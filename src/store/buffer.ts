import {createReducer} from "./util";

export type State = {};

const initialState: State = {};

export type Action = never;
export const reducer = createReducer(initialState, (_state, _action: Action) => {
});
