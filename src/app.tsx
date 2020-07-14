import {h, Fragment} from "preact";

import {useRef} from "preact/hooks";
import {createUseStyles} from "react-jss";
import {useSelector} from "react-redux";

import * as hooks from "./hooks";
import {selectPane, selectRootId} from "#store/pane";
import CommandPalettePlugin from "./plugins/command-palette";
import KeymapPlugin from "./plugins/keymap";
import ProjectPlugin from "./plugins/project";
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
	const rootRef = useRef<HTMLDivElement>();

	const root = useSelector(selectRootId);
	const rootPane = useSelector(selectPane(root))!;

	hooks.useFocusEffect(rootRef);

	return (
		<Fragment>
			<rootPane.View pane={rootPane} className={styles.root} ref={rootRef} />
			<KeymapPlugin />
			<CommandPalettePlugin />
			<ProjectPlugin />
		</Fragment>
	);
};
App.displayName = "App";

export default App;
