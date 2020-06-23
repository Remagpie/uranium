import {h} from "preact";
import type {VNode} from "preact";

import {createUseStyles} from "react-jss";

import $ from "../../nuquery";
import type {Dispatch} from "../../store";
import {deleteRootHook, putRootHook} from "../../store/pane";

const useStyles = createUseStyles({
	root: {
		display: "block",
		position: "absolute",
		width: 100,
		height: 100,
	},
});

function rootPaneHook(vnode: VNode): VNode {
	const styles = useStyles();

	return $(vnode).append(<upalette className={styles.root} />).vnode;
}

export default function effect(dispatch: Dispatch) {
	dispatch(putRootHook(rootPaneHook));

	return function () {
		dispatch(deleteRootHook(rootPaneHook));
	};
}
