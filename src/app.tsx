import {h} from "preact";
import type {FunctionComponent} from "preact";

import {useEffect} from "preact/hooks";
import {createUseStyles} from "react-jss";
import {useSelector} from "react-redux";

import PaneRenderer from "./components/PaneRenderer";
import {useDispatch} from "./store";
import {selectPaneList, putPane} from "./store/pane";
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
			margin: 0,
		},
		"#root": {
			width: "100%",
			height: "100%",
		},
	},
});

const App: FunctionComponent = () => {
	useGlobalStyles();

	const dispatch = useDispatch();
	const panes = useSelector(selectPaneList);

	useEffect(() => {
		// Insert a default pane
		dispatch(putPane(new Pane([])));
	}, []);

	return (
		<PaneRenderer panes={panes} />
	);
};

export default App;
