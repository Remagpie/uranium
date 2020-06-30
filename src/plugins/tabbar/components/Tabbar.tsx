import {h} from "preact";
import type {FunctionComponent} from "preact";

import {createUseStyles} from "react-jss";

import {mergeClass} from "../../../nuquery";
import BufferPane from "#types/pane/buffer";

const useStyles = createUseStyles({
	root: {
		display: "flex",
	},
	item: {
		flex: [1, 1, "auto"],
		maxWidth: 175,
		minWidth: 40,
		textOverflow: "ellipsis",
		overflow: "hidden",
		whiteSpace: "nowrap",
	},
});

type Props = {
	className?: string;
	pane: BufferPane;
};

const Tabbar: FunctionComponent<Props> = (props) => {
	const {className, pane} = props;
	const styles = useStyles();

	const bufferList = pane.buffer;
	const tabNodeList = bufferList.map((id) => <li className={styles.item}>{id}</li>);

	return (
		<utabbar className={mergeClass(styles.root, className)}>
			{tabNodeList}
		</utabbar>
	);
};

export default Tabbar;
