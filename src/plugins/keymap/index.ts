import {deleteReducer, putReducer} from "#store";
import type {Dispatch} from "#store";
import * as store from "./store";

export default function effect(dispatch: Dispatch) {
	dispatch(putReducer("keymap", store.reducer));
	// Insert builtin keymaps
	dispatch(store.putKeymap({
		group: "core",
		key: ["RET"],
		selector: "body",
		command: "core/confirm",
	}));

	const onKeyDown = (event: KeyboardEvent) => {
		const matched = dispatch(store.applyEvent(event));
		if (matched) {
			event.stopImmediatePropagation();
		}
	};
	document.addEventListener("keydown", onKeyDown, true);

	return function () {
		document.removeEventListener("keydown", onKeyDown);
		deleteReducer("keymap");
	};
}
