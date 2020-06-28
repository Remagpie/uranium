import {h} from "preact";
import type {FunctionComponent, VNode} from "preact";

import {createUseStyles} from "react-jss";
import {useSelector} from "react-redux";

import {mergeClass} from "../nuquery";
import {selectBuffer} from "#store/buffer";
import {selectLeafHook} from "#store/pane";
import LeafPane from "#types/pane/leaf";
import EmptyBufferView from "#components/EmptyBufferView";

const useStyles = createUseStyles({
	root: {
		display: "flex",
		flexDirection: "column",
	},
	buffer: {
		flex: [1, 1, "auto"],
	},
});

type Props = {
	className?: string;
	pane: LeafPane;
};

const LeafPaneView: FunctionComponent<Props> = (props) => {
	const {className, pane} = props;

	const styles = useStyles();

	const leafHook = useSelector(selectLeafHook);

	let bufferNode: VNode;
	if (pane.buffer.length === 0) {
		bufferNode = <EmptyBufferView className={styles.buffer} />;
	} else {
		// TODO: Show the active buffer
		const buffer = useSelector(selectBuffer(pane.buffer[0]))!;

		const BufferView = buffer.View.bind(buffer);

		bufferNode = <BufferView className={styles.buffer} />;
	}

	const vnode = (
		<upane type="leaf" className={mergeClass(styles.root, className)}>
			{bufferNode}
		</upane>
	);
	leafHook.forEach((hook) => { hook(vnode, pane); });

	return vnode;
};
LeafPaneView.displayName = "LeafPaneView";

export default LeafPaneView;
