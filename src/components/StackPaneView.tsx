import {h} from "preact";
import type {FunctionComponent, Ref} from "preact";

import {forwardRef} from "preact/compat";
import {createUseStyles} from "react-jss";
import {useSelector} from "react-redux";

import {mergeClass} from "../nuquery";
import * as hooks from "../hooks";
import {selectPane} from "#store/pane";
import StackPane from "#types/pane/stack";

const useStyles = createUseStyles({
	root: {
		display: "block",
	},
	child: {
		position: "absolute",
		top: 0,
		left: 0,
		width: "100%",
		height: "100%",
	},
});

type Props = {
	className?: string;
	pane: StackPane;
};

const StackPaneView: FunctionComponent<Props> = forwardRef((props, ref: Ref<HTMLDivElement>) => {
	const {className, pane} = props;

	const styles = useStyles();
	const paneRef = hooks.useChainedRef(ref);

	const children = pane.children.map((id) => {
		const child = useSelector(selectPane(id));
		// eslint-disable-next-line @typescript-eslint/prefer-optional-chain
		if (child != null && child.display) {
			return <child.View pane={child} className={styles.child} />;
		} else {
			return null;
		}
	});

	return (
		<upane type="stack" className={mergeClass(styles.root, className)} ref={paneRef} tabIndex={-1}>
			{children}
		</upane>
	);
});
StackPaneView.displayName = "StackPaneView";

export default StackPaneView;
