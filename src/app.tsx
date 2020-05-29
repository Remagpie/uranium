import {h} from "preact";
import type {FunctionComponent} from "preact";

import {createUseStyles} from "react-jss";
import {useSelector} from "react-redux";

import PaneRenderer from "./components/PaneRenderer";
import {selectPaneList} from "./store/pane";

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

	const panes = useSelector(selectPaneList);

	return (
		<PaneRenderer panes={panes} />
	);
};

export default App;
