import {h} from "preact";
import type {FunctionComponent, VNode} from "preact";

import {createUseStyles} from "react-jss";
import {useSelector} from "react-redux";

import {mergeClass} from "../nuquery";
import {selectBuffer} from "#store/buffer";
import LeafPane from "#types/pane/leaf";
import EmptyBufferView from "#components/EmptyBufferView";

const useStyles = createUseStyles({
	root: {
		display: "flex",
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

	let view: VNode;
	if (pane.buffer.length === 0) {
		view = <EmptyBufferView className={styles.buffer} />;
	} else {
		// TODO: Show the active buffer
		const buffer = useSelector(selectBuffer(pane.buffer[0]))!;

		const BufferView = buffer.View.bind(buffer);

		view = <BufferView className={styles.buffer} />;
	}

	return (
		<upane type="leaf" className={mergeClass(styles.root, className)}>
			{view}
		</upane>
	);
};
LeafPaneView.displayName = "LeafPaneView";

export default LeafPaneView;
