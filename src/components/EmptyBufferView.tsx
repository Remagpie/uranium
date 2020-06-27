import {h} from "preact";
import type {FunctionComponent} from "preact";

import {createUseStyles} from "react-jss";

const useStyles = createUseStyles({
	root: {
		display: "block",
		width: "100%",
		height: "100%",
	},
});

const EmptyBufferView: FunctionComponent = () => {
	const styles = useStyles();

	return <ubuffer type="empty" className={styles.root} />;
};
EmptyBufferView.displayName = "EmptyBufferView";

export default EmptyBufferView;
