import {h} from "preact";
import type {VNode} from "preact";

import {useSelector} from "react-redux";

import $ from "../../nuquery";
import {deleteReducer, putReducer} from "#store";
import type {Dispatch} from "#store";
import {deleteCommand, putCommand} from "#store/command";
import {deleteRootHook, putRootHook} from "#store/pane";
import Command from "#types/command";
import CommandPalette from "./components/CommandPalette";
import * as store from "./store";

const toggleCommand = new Command({
	id: "command-palette/toggle",
	package: "command-palette",
	title: "Command Palette: Toggle",
	description: "",
	action: (dispatch) => dispatch(store.toggleShow()),
});

function rootPaneHook(vnode: VNode): VNode {
	const show = useSelector(store.selectShow);

	if (show) {
		return $(vnode).append(<CommandPalette />).vnode;
	} else {
		return vnode;
	}
}

export default function effect(dispatch: Dispatch) {
	dispatch(putReducer("command-palette", store.reducer));
	dispatch(putCommand(toggleCommand));
	dispatch(putRootHook(rootPaneHook));

	return function () {
		dispatch(deleteRootHook(rootPaneHook));
		dispatch(deleteCommand(toggleCommand.id));
		dispatch(deleteReducer("command-palette"));
	};
}
