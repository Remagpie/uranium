import {h} from "preact";
import type {FunctionComponent} from "preact";

import {useCallback, useState} from "preact/hooks";
import {createUseStyles} from "react-jss";

import UInput from "#components/UInput";

const useStyles = createUseStyles({
	root: {
		display: "block",
		position: "absolute",
		width: 500,
		top: 0,
		left: "50%",
		transform: "translateX(-50%)",
	},
	input: {
		width: "100%",
	},
});

const CommandPalette: FunctionComponent = () => {
	const styles = useStyles();

	const [text, setText] = useState("");

	const onInput = useCallback((event: h.JSX.TargetedEvent<HTMLInputElement>) => {
		setText(event.currentTarget.value);
	}, []);

	return (
		<div className={styles.root}>
			<UInput className={styles.input} value={text} onInput={onInput} />
		</div>
	);
};

export default CommandPalette;
