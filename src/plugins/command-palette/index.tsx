import {useSelector} from "react-redux";

import {deleteReducer, putReducer} from "#store";
import type {Dispatch} from "#store";
import {deleteCommand, putCommand} from "#store/command";
import * as paneStore from "#store/pane";
import FloatPane from "#types/pane/float";
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

export default function effect(dispatch: Dispatch) {
	const root = useSelector(paneStore.selectRootId);
	const pane = new FloatPane(CommandPalette, {
		top: 0,
		left: "50%",
		width: "auto",
		height: "auto",
		transform: "translateX(-50%)",
	});
	pane.display = false;

	const onCommand = (event: Event) => {
		if (!(event instanceof CustomEvent && event.detail instanceof Command)) {
			return;
		}
		switch (event.detail.id) {
			case toggleCommand.id: {
				dispatch(store.togglePane());
				break;
			}
		}
	};
	document.body.addEventListener("command", onCommand);
	dispatch(putReducer("command-palette", store.reducer));
	dispatch(putCommand(toggleCommand));
	dispatch(paneStore.putPane(pane));
	dispatch(paneStore.patchPane(root, (p) => {
		p.children.push(pane.id);
	}));
	dispatch(store.putPane(pane.id));
	dispatch(putKeymap({
		group: "command-palette",
		key: ["S-C-p"],
		selector: "body",
		command: toggleCommand.id,
	}));

	return function () {
		// TODO: delete pane
		dispatch(deleteKeymapGroup("command-palette"));
		dispatch(deleteCommand(toggleCommand.id));
		dispatch(deleteReducer("command-palette"));
		document.body.removeEventListener("command", onCommand);
	};
}
