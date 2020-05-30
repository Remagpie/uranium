import {h} from "preact";
import type {FunctionComponent} from "preact";

import {createUseStyles} from "react-jss";

const useStyles = createUseStyles({
	root: {
		width: "100%",
		height: "100%",
	},
});

const EmptyView: FunctionComponent = () => {
	const styles = useStyles();

	return <div className={styles.root} />;
};

export default EmptyView;
