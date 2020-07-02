import {h} from "preact";
import type {FunctionComponent, VNode} from "preact";

import {createUseStyles} from "react-jss";
import {useSelector} from "react-redux";

import {mergeClass} from "../nuquery";
import {selectBuffer} from "#store/buffer";
import BufferPane from "#types/pane/buffer";

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
	pane: BufferPane;
};

const BufferPaneView: FunctionComponent<Props> = (props) => {
	const {className, pane} = props;

	const styles = useStyles();

	const buffer = useSelector(selectBuffer(pane.buffer));
	let bufferNode: VNode | undefined;
	if (buffer != null) {
		const BufferView = buffer.View.bind(buffer);

		bufferNode = <BufferView className={styles.buffer} />;
	}

	return (
		<upane type="buffer" className={mergeClass(styles.root, className)}>
			{bufferNode}
		</upane>
	);
};
BufferPaneView.displayName = "BufferPaneView";

export default BufferPaneView;
