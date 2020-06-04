import {h} from "preact";
import type {FunctionComponent} from "preact";

import {useEffect} from "preact/hooks";
import {createUseStyles} from "react-jss";
import {useSelector} from "react-redux";

import PaneRenderer from "./components/PaneRenderer";
import PaneView from "./components/PaneView";
import useResetStyles from "./reset-style";
import {useDispatch} from "./store";
import {putBuffer} from "./store/buffer";
import {putCommand, runCommand} from "./store/command";
import {selectPaneList, putPane} from "./store/pane";
import TextBuffer from "./types/buffer/text";
import Command from "./types/command";
import Pane from "./types/pane";

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
	const panes = useSelector(selectPaneList);

	useEffect(() => {
		// Insert a default pane
		dispatch(putPane(new Pane()));
		// Insert builtin commands
		dispatch(putCommand(new Command({
			id: "buffer/open-file",
			package: "buffer",
			title: "Open a file",
			description: "",
			thunk: async (dispatch) => {
				// TODO: accept the path from the user input
				const buffer = await TextBuffer.open("./package.json");
				dispatch(putBuffer(buffer));
				dispatch(putPane(new Pane(buffer.id)));
			},
		})));
		dispatch(runCommand("buffer/open-file"));
	}, []);

	return (
		<PaneRenderer>
			{panes.map((p) => <PaneView pane={p} />)}
		</PaneRenderer>
	);
};

export default App;
