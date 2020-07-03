import {h} from "preact";
import type {FunctionComponent, Ref, VNode} from "preact";

import {forwardRef} from "preact/compat";
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

const BufferPaneView: FunctionComponent<Props> = forwardRef((props, ref: Ref<HTMLDivElement>) => {
	const {className, pane} = props;

	const styles = useStyles();

	const buffer = useSelector(selectBuffer(pane.buffer));
	let bufferNode: VNode | undefined;
	if (buffer != null) {
		bufferNode = <buffer.View className={styles.buffer} buffer={buffer} />;
	}

	return (
		<upane type="buffer" className={mergeClass(styles.root, className)} ref={ref}>
			{bufferNode}
		</upane>
	);
});
BufferPaneView.displayName = "BufferPaneView";

export default BufferPaneView;
