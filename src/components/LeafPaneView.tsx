import {h} from "preact";
import type {FunctionComponent, VNode} from "preact";

import {createUseStyles} from "react-jss";
import {useSelector} from "react-redux";

import {selectBuffer} from "#store/buffer";
import LeafPane from "#types/pane/leaf";
import EmptyBufferView from "#components/EmptyBufferView";

const useStyles = createUseStyles({
	root: {
		display: "block",
		width: "100%",
		height: "100%",
	},
});

type Props = {
	pane: LeafPane;
};

const LeafPaneView: FunctionComponent<Props> = (props) => {
	const {pane} = props;

	const styles = useStyles();

	let view: VNode;
	if (pane.buffer.length === 0) {
		view = <EmptyBufferView />;
	} else {
		// TODO: Show the active buffer
		const buffer = useSelector(selectBuffer(pane.buffer[0]))!;

		const BufferView = buffer.View.bind(buffer);

		view = <BufferView />;
	}

	return <upane type="leaf" className={styles.root}>{view}</upane>;
};
LeafPaneView.displayName = "LeafPaneView";

export default LeafPaneView;
