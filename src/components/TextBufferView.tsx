import {h} from "preact";
import type {FunctionComponent} from "preact";

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

const TextBufferView: FunctionComponent<Props> = (props) => {
	const {buffer, className} = props;

	const styles = useStyles();

	return (
		<ubuffer type="text" className={mergeClass(styles.root, className)}>
			{buffer.content}
		</ubuffer>
	);
};
TextBufferView.displayName = "TextBufferView";

export default TextBufferView;
