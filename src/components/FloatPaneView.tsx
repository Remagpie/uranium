import {h} from "preact";
import type {FunctionComponent, Ref} from "preact";

import {forwardRef} from "preact/compat";
import {createUseStyles} from "react-jss";

import {mergeClass} from "../nuquery";
import * as hooks from "../hooks";
import FloatPane from "#types/pane/float";

const useStyles = createUseStyles({
	root: (paneStyle: FloatPane["style"]) => ({
		display: "block",
		position: "absolute",
		...paneStyle,
	}),
});

type Props = {
	className?: string;
	pane: FloatPane;
};

const FloatPaneView: FunctionComponent<Props> = forwardRef((props, ref: Ref<HTMLDivElement>) => {
	const {className, pane} = props;

	const styles = useStyles(pane.style);
	const paneRef = hooks.useChainedRef(ref);

	return (
		<upane type="float" className={mergeClass(styles.root, className)} ref={paneRef} tabIndex={-1}>
			<pane.Content />
		</upane>
	);
});
FloatPaneView.displayName = "FloatPaneView";

export default FloatPaneView;
