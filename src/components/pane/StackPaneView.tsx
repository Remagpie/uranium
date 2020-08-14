import {h} from "preact";

import {createUseStyles} from "react-jss";

import {StackPane} from "#types/pane/stack";

const useStyles = createUseStyles({
	root: {
		display: "block",
	},
});

type Props = {
	className?: string;
	pane: StackPane;
};

const StackPaneView = (props: Props) => {
	const {className, pane} = props;

	const styles = useStyles();

	// TODO: Map panes to view
	const children = pane.children;

	return (
		<upane type="stack" className={[styles.root, className].join(" ")}>
			{children}
		</upane>
	);
};
StackPaneView.displayName = "StackPaneView";

export default StackPaneView;
