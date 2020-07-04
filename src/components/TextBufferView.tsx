import {h} from "preact";
import type {FunctionComponent, Ref} from "preact";

import {forwardRef} from "preact/compat";
import {createUseStyles} from "react-jss";

import {mergeClass} from "../nuquery";
import USpan from "#components/USpan";
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
	const lineNodes = buffer.content.map((line, index) => {
		const cursor = buffer.cursor[1] === index ? buffer.cursor[0] : undefined;

		return <USpan cursor={cursor} className={styles.line}>{line}</USpan>;
	});

	return (
		<ubuffer type="text" className={mergeClass(styles.root, className)} ref={ref} tabIndex={-1}>
			{lineNodes}
		</ubuffer>
	);
});
TextBufferView.displayName = "TextBufferView";

export default TextBufferView;
