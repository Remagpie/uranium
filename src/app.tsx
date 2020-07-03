import {h} from "preact";
import type {FunctionComponent} from "preact";

import {useEffect} from "preact/hooks";
import {createUseStyles} from "react-jss";
import {useSelector} from "react-redux";

import {useDispatch} from "#store";
import {selectPane, selectRootId, selectRootHook} from "#store/pane";
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
	const rootPane = useSelector(selectPane(root))!;
	const rootHook = useSelector(selectRootHook);

	useEffect(() => keymapEffect(dispatch), []);
	useEffect(() => commandPalleteEffect(dispatch), []);

	const vnode = <rootPane.View pane={rootPane} className={styles.root} />;
	rootHook.forEach((hook) => { hook(vnode); });

	return vnode;
};
App.displayName = "App";

export default App;
