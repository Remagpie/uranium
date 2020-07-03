import {h} from "preact";
import type {FunctionComponent, Ref, VNode} from "preact";

import {forwardRef} from "preact/compat";
import {createUseStyles} from "react-jss";
import {useSelector} from "react-redux";

import {mergeClass} from "../nuquery";
import {selectPane} from "#store/pane";
import TabPane from "#types/pane/tab";

const useStyles = createUseStyles({
	root: {
		display: "flex",
		flexDirection: "column",
	},
	tabBar: {
		display: "flex",
		flex: [0, 0, "auto"],
	},
	tabItem: {
		flex: [1, 1, "auto"],
		maxWidth: 175,
		minWidth: 40,
		textOverflow: "ellipsis",
		overflow: "hidden",
		whiteSpace: "nowrap",
	},
	body: {
		flex: [1, 1, "auto"],
	},
});

type Props = {
	className?: string;
	pane: TabPane;
};

const TabPaneView: FunctionComponent<Props> = forwardRef((props, ref: Ref<HTMLDivElement>) => {
	const {className, pane} = props;

	const styles = useStyles();

	const tabItemList = pane.children.map((id) => <li className={styles.tabItem}>{id}</li>);
	let bodyNode: VNode | undefined;
	if (pane.active != null) {
		const body = useSelector(selectPane(pane.active));
		if (body != null) {
			bodyNode = <body.View pane={body} className={styles.body} />;
		}
	}

	const vnode = (
		<upane type="tab" className={mergeClass(styles.root, className)} ref={ref}>
			<div className={styles.tabBar}>{tabItemList}</div>
			{bodyNode}
		</upane>
	);

	return vnode;
});
TabPaneView.displayName = "TabPaneView";

export default TabPaneView;
