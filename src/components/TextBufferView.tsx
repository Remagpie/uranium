import {h} from "preact";
import type {FunctionComponent} from "preact";

import {createUseStyles} from "react-jss";

import TextBuffer from "#types/buffer/text";

const useStyles = createUseStyles({
	root: {
		display: "block",
		width: "100%",
		height: "100%",
	},
});

type Props = {
	buffer: TextBuffer;
};

const TextBufferView: FunctionComponent<Props> = (props) => {
	const {buffer} = props;

	const styles = useStyles();

	return (
		<ubuffer type="text" className={styles.root}>
			{buffer.content}
		</ubuffer>
	);
};
TextBufferView.displayName = "TextBufferView";

export default TextBufferView;
