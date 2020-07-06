import {h} from "preact";
import type {FunctionComponent} from "preact";

import {createUseStyles} from "react-jss";

import {mergeClass} from "../nuquery";
import UChar from "#components/UChar";

const useStyles = createUseStyles({
	root: {
		display: "inline",
	},
	cursor: {
		backgroundColor: "gray",
	},
});

type Props = {
	className?: string;
	children?: string;
	highlight?: [number, number];
};

const USpan: FunctionComponent<Props> = (props) => {
	const {className, children, highlight} = props;
	const styles = useStyles();

	const charNodes = (children ?? "").split("").map((char, index) => {
		const charClass = cursor === index ? styles.cursor : undefined;
		return <UChar className={charClass}>{char}</UChar>;
	});

	return (
		<uspan className={mergeClass(styles.root, className)}>
			{charNodes}
			<uchar>{" "}</uchar>
		</uspan>
	);
};
USpan.displayName = "USpan";

export default USpan;
