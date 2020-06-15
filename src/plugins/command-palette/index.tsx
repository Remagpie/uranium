import {h} from "preact";
import type {VNode} from "preact";

import {createUseStyles} from "react-jss";

import type {Dispatch} from "../../store";
import {deleteRootHook, putRootHook} from "../../store/pane";

function addChild(vnode: VNode, child: VNode) {
	if (Array.isArray(vnode.props.children)) {
		vnode.props.children.push(child);
	} else if (vnode.props.children == null) {
		vnode.props.children = child;
	} else {
		vnode.props.children = [vnode.props.children, child];
	}
}

const useStyles = createUseStyles({
	root: {
		position: "absolute",
		width: 100,
		height: 100,
	},
});

function rootPaneHook(vnode: VNode): VNode {
	const styles = useStyles();

	addChild(vnode, <div className={styles.root} />);

	return vnode;
}

export default function effect(dispatch: Dispatch) {
	dispatch(putRootHook(rootPaneHook));

	return function () {
		dispatch(deleteRootHook(rootPaneHook));
	};
}
