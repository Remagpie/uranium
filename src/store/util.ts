import produce from "immer";
import type {Draft} from "immer";

type Reducer<S, A> = (state: Draft<S>, action: A) => void;
export function createReducer<S, A>(initial: S, reducer: Reducer<S, A>) {
	return (state: S = initial, action: A) => produce(
		state,
		(s) => reducer(s, action),
	);
}
