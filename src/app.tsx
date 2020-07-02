import {h} from "preact";
import type {FunctionComponent} from "preact";

import {useEffect} from "preact/hooks";
import {createUseStyles} from "react-jss";
import {useSelector} from "react-redux";

import {useDispatch} from "#store";
import {putBuffer} from "#store/buffer";
import {putCommand, runCommand} from "#store/command";
import {selectPane, selectRootId, selectRootHook, patchPane, putPane, putRoot} from "#store/pane";
import TextBuffer from "#types/buffer/text";
import Command from "#types/command";
import BufferPane from "#types/pane/buffer";
import TabPane from "#types/pane/tab";
import commandPalleteEffect from "./plugins/command-palette";
import keymapEffect from "./plugins/keymap";
import useResetStyles from "./reset-style";

const useStyles = createUseStyles({
	root: {
		width: "100%",
		height: "100%",
	},
});

const App: FunctionComponent = () => {
	useResetStyles();

	const styles = useStyles();
	const dispatch = useDispatch();

	const root = useSelector(selectRootId);
	const rootHook = useSelector(selectRootHook);

	useEffect(() => {
		// Insert a default root pane
		const pane = new TabPane();
		dispatch(putPane(pane));
		dispatch(putRoot(pane.id));
		// Insert builtin commands
		dispatch(putCommand(new Command({
			id: "core/confirm",
			package: "core",
			title: "Confirm",
			description: "",
			action: () => { /* Do nothing */ },
		})));
		dispatch(putCommand(new Command({
			id: "buffer/open-file",
			package: "buffer",
			title: "Open a file",
			description: "",
			action: async (dispatch2) => {
				// TODO: accept the path from the user input
				const buffer = await TextBuffer.open("./package.json");
				dispatch2(putBuffer(buffer));

				const bufferPane = new BufferPane(buffer.id);
				dispatch2(putPane(bufferPane));
				// TODO: open in the selected pane
				dispatch2(patchPane(pane.id, (p) => {
					p.children.push(bufferPane.id);
					(p as TabPane).active = bufferPane.id;
				}));
			},
		})));
		dispatch(runCommand("buffer/open-file"));
	}, []);

	useEffect(() => keymapEffect(dispatch), []);
	useEffect(() => commandPalleteEffect(dispatch), []);

	if (root == null) {
		return null;
	}

	const pane = useSelector(selectPane(root))!;
	const vnode = <pane.View pane={pane} className={styles.root} />;
	rootHook.forEach((hook) => { hook(vnode); });

	return vnode;
};
App.displayName = "App";

export default App;
