import {h} from "preact";
import type {VNode} from "preact";

import {useSelector} from "react-redux";

import $ from "../../nuquery";
import {deleteReducer, putReducer} from "#store";
import type {Dispatch} from "#store";
import {deleteCommand, putCommand} from "#store/command";
import {deleteRootHook, putRootHook} from "#store/pane";
import Command from "#types/command";
import {deleteKeymapGroup, putKeymap} from "../keymap/store";
import CommandPalette from "./components/CommandPalette";
import * as store from "./store";

const toggleCommand = new Command({
	id: "command-palette/toggle",
	package: "command-palette",
	title: "Command Palette: Toggle",
	description: "",
});

function rootPaneHook(vnode: VNode) {
	const show = useSelector(store.selectShow);

	if (show) {
		$(vnode).append(<CommandPalette />);
	}
}

export default function effect(dispatch: Dispatch) {
	const onCommand = (event: Event) => {
		if (!(event instanceof CustomEvent && event.detail instanceof Command)) {
			return;
		}
		switch (event.detail.id) {
			case toggleCommand.id: {
				dispatch(store.toggleShow());
				break;
			}
		}
	};
	document.body.addEventListener("command", onCommand);
	dispatch(putReducer("command-palette", store.reducer));
	dispatch(putCommand(toggleCommand));
	dispatch(putRootHook(rootPaneHook));
	dispatch(putKeymap({
		group: "command-palette",
		key: ["S-C-p"],
		selector: "body",
		command: toggleCommand.id,
	}));

	return function () {
		dispatch(deleteKeymapGroup("command-palette"));
		dispatch(deleteRootHook(rootPaneHook));
		dispatch(deleteCommand(toggleCommand.id));
		dispatch(deleteReducer("command-palette"));
		document.body.removeEventListener("command", onCommand);
	};
}
