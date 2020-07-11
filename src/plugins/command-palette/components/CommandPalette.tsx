import {h} from "preact";
import type {FunctionComponent} from "preact";

import {useCallback, useState} from "preact/hooks";
import {createUseStyles} from "react-jss";

import UInput from "#components/UInput";
import {useDispatch} from "#store";
import {runCommand} from "#store/command";
import Command from "#types/command";
import {hidePane} from "../store";

const useStyles = createUseStyles({
	root: {
		display: "block",
		width: 500,
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
			if (!(event instanceof CustomEvent && event.detail instanceof Command)) {
				return;
			}
			switch (event.detail.id) {
				case "core/confirm": {
					dispatch(hidePane());
					// TODO: Check if the command exists
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
