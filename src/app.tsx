import {h} from "preact";
import type {FunctionComponent} from "preact";

import {useEffect, useRef} from "preact/hooks";
import {createUseStyles} from "react-jss";
import {useSelector} from "react-redux";

import * as hooks from "./hooks";
import {useDispatch} from "#store";
import {selectPane, selectRootId} from "#store/pane";
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
	const rootRef = useRef<HTMLDivElement>();

	const root = useSelector(selectRootId);
	const rootPane = useSelector(selectPane(root))!;

	useEffect(() => keymapEffect(dispatch), []);
	useEffect(() => commandPalleteEffect(dispatch), []);
	hooks.useFocusEffect(rootRef);

	return <rootPane.View pane={rootPane} className={styles.root} ref={rootRef} />;
};
App.displayName = "App";

export default App;
