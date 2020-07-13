import {h} from "preact";

import {forwardRef} from "preact/compat";
import {useCallback, useState} from "preact/hooks";
import {createUseStyles} from "react-jss";

import {mergeClass} from "../../../nuquery";
import * as hooks from "../../../hooks";
import UInput from "#components/UInput";
import {useDispatch} from "#store";
import {runCommand} from "#store/command";
import CommandPalettePane from "../pane";
import {hidePane} from "../store";

const useStyles = createUseStyles({
	root: {
		display: "block",
		position: "absolute",
		top: 0,
		left: "50%",
		width: 500,
		transform: "translateX(-50%)",
	},
	input: {
		width: "100%",
	},
});

type Props = {
	className?: string;
	pane: CommandPalettePane;
};

const CommandPalettePaneView = forwardRef<HTMLDivElement, Props>((props, ref) => {
	const {className} = props;

	const dispatch = useDispatch();
	const styles = useStyles();
	const paneRef = hooks.useChainedRef(ref);

	const [text, setText] = useState("");

	hooks.useCommandEvent(paneRef, {
		"core/confirm": () => {
			dispatch(hidePane());
			// TODO: Check if the command exists
			dispatch(runCommand(text));
		},
	}, [text]);

	const onInput = useCallback((event: h.JSX.TargetedEvent<HTMLInputElement>) => {
		setText(event.currentTarget.value);
	}, []);

	return (
		<upane
			type="command-palette"
			className={mergeClass(styles.root, className)}
			ref={paneRef}
			tabIndex={-1}
		>
			<UInput className={styles.input} value={text} onInput={onInput} />
		</upane>
	);
});
CommandPalettePaneView.displayName = "CommandPalettePaneView";

export default CommandPalettePaneView;
