import {h} from "preact";
import type {FunctionComponent} from "preact";

import {createUseStyles} from "react-jss";

import {mergeClass} from "../nuquery";

const useStyles = createUseStyles({
	root: {
		display: "block",
	},
});

type Props = {
	className?: string;
};

const EmptyBufferView: FunctionComponent<Props> = (props) => {
	const {className} = props;

	const styles = useStyles();

	return <ubuffer type="empty" className={mergeClass(styles.root, className)} />;
};
EmptyBufferView.displayName = "EmptyBufferView";

export default EmptyBufferView;
