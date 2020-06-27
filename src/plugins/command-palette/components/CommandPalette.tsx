import {h} from "preact";
import type {FunctionComponent} from "preact";

import {useCallback, useState} from "preact/hooks";
import {createUseStyles} from "react-jss";

import UInput from "#components/UInput";
import {useDispatch} from "#store";
import {runCommand} from "#store/command";
import {putShow} from "../store";

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
	const dispatch = useDispatch();
	const styles = useStyles();

	const [text, setText] = useState("");

	const ref = useCallback((element: HTMLDivElement | null) => {
		element?.addEventListener("command", (event) => {
			if (!(event instanceof CustomEvent && typeof event.detail === "string")) {
				return;
			}
			switch (event.detail) {
				case "core/confirm": {
					dispatch(putShow(false));
					dispatch(runCommand(text));
					break;
				}
			}
		});
	}, [text]);

	const onInput = useCallback((event: h.JSX.TargetedEvent<HTMLInputElement>) => {
		setText(event.currentTarget.value);
	}, []);

	return (
		<upalette ref={ref} className={styles.root}>
			<UInput className={styles.input} value={text} onInput={onInput} />
		</upalette>
	);
};
CommandPalette.displayName = "CommandPalette";

export default CommandPalette;
