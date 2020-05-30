import {h} from "preact";
import type {FunctionComponent} from "preact";

import {useEffect} from "preact/hooks";
import {createUseStyles} from "react-jss";
import {useSelector} from "react-redux";

import PaneRenderer from "./components/PaneRenderer";
import useResetStyles from "./reset-style";
import {useDispatch} from "./store";
import {putCommand} from "./store/command";
import {selectPaneList, putPane} from "./store/pane";
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
		dispatch(putPane(new Pane([])));
		// Insert builtin commands
		dispatch(putCommand(new Command({
			id: "buffer/open-file",
			package: "buffer",
			title: "Open a file",
			description: "",
			action: "buffer/open-file",
		})));
	}, []);

	return (
		<PaneRenderer panes={panes} />
	);
};

export default App;
