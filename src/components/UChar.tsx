import {h} from "preact";
import type {FunctionComponent} from "preact";

import {createUseStyles} from "react-jss";

import {mergeClass} from "../nuquery";

const useStyles = createUseStyles({
	root: {
		display: "inline",
	},
});

type Props = {
	className?: string;
	children: string;
};

const UChar: FunctionComponent<Props> = (props) => {
	const {className, children} = props;
	const styles = useStyles();

	return <uchar className={mergeClass(styles.root, className)}>{children}</uchar>;
};
UChar.displayName = "UChar";

export default UChar;
