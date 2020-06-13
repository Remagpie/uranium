import {h} from "preact";
import type {FunctionComponent} from "preact";

import {useEffect} from "preact/hooks";
import {createUseStyles} from "react-jss";
import {useSelector} from "react-redux";

import useResetStyles from "./reset-style";
import {useDispatch} from "./store";
import {putBuffer} from "./store/buffer";
import {putCommand, runCommand} from "./store/command";
import {selectPane, selectRootId, patchPane, putPane, putRoot} from "./store/pane";
import TextBuffer from "./types/buffer/text";
import Command from "./types/command";
import LeafPane from "./types/pane/leaf";

const useGlobalStyles = createUseStyles({
	"@global": {
		html: {
			width: "100%",
			height: "100%",
		},
		body: {
			width: "100%",
			height: "100%",
		},
		"#root": {
			width: "100%",
			height: "100%",
		},
	},
});

const App: FunctionComponent = () => {
	useResetStyles();
	useGlobalStyles();

	const dispatch = useDispatch();

	const root = useSelector(selectRootId);

	useEffect(() => {
		// Insert a default root pane
		const pane = new LeafPane();
		dispatch(putPane(pane));
		dispatch(putRoot(pane.id));
		// Insert builtin commands
		dispatch(putCommand(new Command({
			id: "buffer/open-file",
			package: "buffer",
			title: "Open a file",
			description: "",
			thunk: async (dispatch2) => {
				// TODO: accept the path from the user input
				const buffer = await TextBuffer.open("./package.json");
				dispatch2(putBuffer(buffer));
				// TODO: open in the selected pane
				dispatch2(patchPane(pane.id, (p) => {
					if (p instanceof LeafPane) {
						p.buffer.push(buffer.id);
					} else {
						// TODO
					}
				}));
			},
		})));
		dispatch(runCommand("buffer/open-file"));
	}, []);

	if (root != null) {
		const pane = useSelector(selectPane(root));

		const PaneView = pane.View.bind(pane);

		return <PaneView />;
	} else {
		return null;
	}
};

export default App;
