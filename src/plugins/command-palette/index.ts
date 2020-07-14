import {useEffect, useRef} from "preact/hooks";
import {useSelector} from "react-redux";

import * as hooks from "../../hooks";
import {deleteReducer, putReducer, useDispatch} from "#store";
import {deleteCommand, putCommand} from "#store/command";
import * as paneStore from "#store/pane";
import Command from "#types/command";
import {deleteKeymapGroup, putKeymap} from "../keymap/store";
import CommandPalettePane from "./pane";
import * as store from "./store";

const toggleCommand = new Command({
	id: "command-palette/toggle",
	package: "command-palette",
	title: "Command Palette: Toggle",
	description: "",
});

const CommandPalettePlugin = () => {
	const bodyRef = useRef(document.body);
	const dispatch = useDispatch();

	const root = useSelector(paneStore.selectRootId);

	hooks.useCommandEvent(bodyRef, {
		[toggleCommand.id]: () => {
			dispatch(store.togglePane());
		},
	}, []);

	useEffect(() => {
		const pane = new CommandPalettePane();
		pane.display = false;

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
			dispatch(deleteKeymapGroup("command-palette"));
			// TODO: delete pane
			dispatch(deleteCommand(toggleCommand.id));
			dispatch(deleteReducer("command-palette"));
		};
	}, []);

	return null;
};
CommandPalettePlugin.displayName = "CommandPalettePlugin";

export default CommandPalettePlugin;
