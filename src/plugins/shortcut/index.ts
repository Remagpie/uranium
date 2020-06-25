import {deleteReducer, putReducer} from "#store";
import type {Dispatch} from "#store";
import * as store from "./store";

export default function effect(dispatch: Dispatch) {
	dispatch(putReducer("shortcut", store.reducer));

	const onKeyDown = (event: KeyboardEvent) => {
		const matched = dispatch(store.enterKey(event.code));
		if (matched) {
			event.stopImmediatePropagation();
		}
	};
	document.addEventListener("keydown", onKeyDown, true);

	return function () {
		document.removeEventListener("keydown", onKeyDown);
		deleteReducer("shortcut");
	};
}
