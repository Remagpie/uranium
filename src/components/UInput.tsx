import {h} from "preact";

import {createUseStyles} from "react-jss";

import {mergeClass} from "../nuquery";

const useStyles = createUseStyles({
	root: {
		display: "block",
	},
});

type Props = {
	className?: string;
	value: string;
	onInput?: h.JSX.IntrinsicElements["input"]["onInput"];
};

const UInput = (props: Props) => {
	const {className, value, onInput} = props;
	const styles = useStyles();

	return (
		<input
			className={mergeClass(styles.root, className)}
			type="text"
			value={value}
			onInput={onInput}
		/>
	);
};
UInput.displayName = "UInput";

export default UInput;
