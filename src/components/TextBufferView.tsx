import {h} from "preact";
import type {FunctionComponent, Ref} from "preact";

import {forwardRef} from "preact/compat";
import {createUseStyles} from "react-jss";

import {mergeClass} from "../nuquery";
import TextBuffer from "#types/buffer/text";

const useStyles = createUseStyles({
	root: {
		display: "block",
	},
	line: {
		display: "block",
		whiteSpace: "pre",
	},
});

type Props = {
	className?: string;
	buffer: TextBuffer;
};

const TextBufferView: FunctionComponent<Props> = forwardRef((props, ref: Ref<HTMLDivElement>) => {
	const {buffer, className} = props;

	const styles = useStyles();
	const lineNodes = buffer.content.map((line) => <span className={styles.line}>{line}</span>);

	return (
		<ubuffer type="text" className={mergeClass(styles.root, className)} ref={ref} tabIndex={-1}>
			{lineNodes}
		</ubuffer>
	);
});
TextBufferView.displayName = "TextBufferView";

export default TextBufferView;
