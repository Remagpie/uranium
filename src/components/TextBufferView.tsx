import {h} from "preact";
import type {FunctionComponent, Ref} from "preact";

import {forwardRef} from "preact/compat";
import {createUseStyles} from "react-jss";

import * as hooks from "../hooks";
import {mergeClass} from "../nuquery";
import UTextArea from "#components/UTextArea";
import {useDispatch} from "#store";
import {patchBuffer} from "#store/buffer";
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

	const dispatch = useDispatch();
	const styles = useStyles();
	const bufferRef = hooks.useChainedRef(ref);

	hooks.useCommandEvent(bufferRef, {
		"core/move-up": () => dispatch(patchBuffer<TextBuffer>(buffer.id, (b) => b.moveCursor(0, -1))),
		"core/move-down": () => dispatch(patchBuffer<TextBuffer>(buffer.id, (b) => b.moveCursor(0, 1))),
		"core/move-left": () => {
			dispatch(patchBuffer<TextBuffer>(buffer.id, (b) => b.moveCursor(-1, 0)));
		},
		"core/move-right": () => {
			dispatch(patchBuffer<TextBuffer>(buffer.id, (b) => b.moveCursor(1, 0)));
		},
	}, [buffer.id]);

	return (
		<ubuffer
			type="text"
			className={mergeClass(styles.root, className)}
			ref={bufferRef}
			tabIndex={-1}
		>
			<UTextArea value={buffer.content} cursor={buffer.cursor} />
		</ubuffer>
	);
});
TextBufferView.displayName = "TextBufferView";

export default TextBufferView;
