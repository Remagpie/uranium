import {h} from "preact";

import {createUseStyles} from "react-jss";

import StackPaneView from "#components/pane/StackPaneView";
import {StackPane} from "#types/pane/stack";
import useResetStyles from "./reset-style";

const useStyles = createUseStyles({
	root: {
		width: "100%",
		height: "100%",
	},
});

const App = () => {
	useResetStyles();

	const styles = useStyles();

	const pane: StackPane = {
		id: 0,
		type: "stack",
		display: true,
		children: [],
		active: undefined,
	};

	return <StackPaneView className={styles.root} pane={pane} />;
};
App.displayName = "App";

export default App;
