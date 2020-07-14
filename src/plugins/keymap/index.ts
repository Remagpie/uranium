import {useCallback, useEffect} from "preact/hooks";

import {deleteReducer, putReducer, useDispatch} from "#store";
import * as store from "./store";

const KeymapPlugin = () => {
	const dispatch = useDispatch();

	const onKeyDown = useCallback((event: KeyboardEvent) => {
		const matched = dispatch(store.applyEvent(event));
		if (matched) {
			event.stopImmediatePropagation();
			event.preventDefault();
		}
	}, []);

	useEffect(() => {
		dispatch(putReducer("keymap", store.reducer));
		// Insert builtin keymaps
		dispatch(store.putKeymap({
			group: "core",
			key: ["RET"],
			selector: "body",
			command: "core/confirm",
		}));
		dispatch(store.putKeymap({
			group: "core",
			key: ["<up>"],
			selector: "body",
			command: "core/move-up",
		}));
		dispatch(store.putKeymap({
			group: "core",
			key: ["<down>"],
			selector: "body",
			command: "core/move-down",
		}));
		dispatch(store.putKeymap({
			group: "core",
			key: ["<left>"],
			selector: "body",
			command: "core/move-left",
		}));
		dispatch(store.putKeymap({
			group: "core",
			key: ["<right>"],
			selector: "body",
			command: "core/move-right",
		}));
		dispatch(store.putKeymap({
			group: "core",
			key: ["C-o"],
			selector: "body",
			command: "buffer/open-file",
		}));
		document.addEventListener("keydown", onKeyDown, true);

		return function () {
			document.removeEventListener("keydown", onKeyDown);
			deleteReducer("keymap");
		};
	}, []);

	return null;
};
KeymapPlugin.displayName = "KeymapPlugin";

export default KeymapPlugin;
