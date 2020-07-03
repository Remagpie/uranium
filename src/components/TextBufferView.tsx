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
});

type Props = {
	className?: string;
	buffer: TextBuffer;
};

const TextBufferView: FunctionComponent<Props> = forwardRef((props, ref: Ref<HTMLDivElement>) => {
	const {buffer, className} = props;

	const styles = useStyles();

	return (
		<ubuffer type="text" className={mergeClass(styles.root, className)} ref={ref}>
			{buffer.content}
		</ubuffer>
	);
});
TextBufferView.displayName = "TextBufferView";

export default TextBufferView;
