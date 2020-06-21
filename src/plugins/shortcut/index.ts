import type {Dispatch} from "../../store";
import {enterKey} from "../../store/shortcut";

function createOnKeyDown(dispatch: Dispatch) {
	return (event: KeyboardEvent) => {
		dispatch(enterKey(event.code));
		event.stopImmediatePropagation();
	};
}

export default function effect(dispatch: Dispatch) {
	const onKeyDown = createOnKeyDown(dispatch);
	document.addEventListener("keydown", onKeyDown);

	return function () {
		document.removeEventListener("keydown", onKeyDown);
	};
}
