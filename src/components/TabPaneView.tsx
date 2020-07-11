import {h} from "preact";
import type {FunctionComponent, Ref, VNode} from "preact";

import {ipcRenderer} from "electron";
import type {OpenDialogReturnValue} from "electron";
import {forwardRef} from "preact/compat";
import {createUseStyles} from "react-jss";
import {useSelector} from "react-redux";

import {mergeClass} from "../nuquery";
import * as hooks from "../hooks";
import {useDispatch} from "#store";
import {putBuffer} from "#store/buffer";
import {patchPane, putPane, selectPane} from "#store/pane";
import TextBuffer from "#types/buffer/text";
import BufferPane from "#types/pane/buffer";
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

	const dispatch = useDispatch();
	const styles = useStyles();
	const paneRef = hooks.useChainedRef(ref);

	hooks.useCommandEvent(paneRef, {
		"buffer/open-file": async () => {
			const dialogResult: OpenDialogReturnValue = await ipcRenderer.invoke("dialog.open", {
				title: "Select a file to open",
			});

			if (dialogResult.canceled) {
				return;
			}

			for (const file of dialogResult.filePaths) {
				const buffer = await TextBuffer.open(file);
				dispatch(putBuffer(buffer));

				const bufferPane = new BufferPane(buffer.id);
				dispatch(putPane(bufferPane));
				dispatch(patchPane(pane.id, (p) => {
					p.children.push(bufferPane.id);
					(p as TabPane).active = bufferPane.id;
				}));
			}
		},
	}, [pane]);

	const tabItemList = pane.children.map((id) => {
		const child = useSelector(selectPane(id));
		// eslint-disable-next-line @typescript-eslint/prefer-optional-chain
		if (child != null && child.display) {
			return <li className={styles.tabItem}>{id}</li>;
		} else {
			return null;
		}
	});
	let bodyNode: VNode | undefined;
	if (pane.active != null) {
		const body = useSelector(selectPane(pane.active));
		if (body != null) {
			bodyNode = <body.View pane={body} className={styles.body} />;
		}
	}

	return (
		<upane type="tab" className={mergeClass(styles.root, className)} ref={paneRef} tabIndex={-1}>
			<div className={styles.tabBar}>{tabItemList}</div>
			{bodyNode}
		</upane>
	);
});
TabPaneView.displayName = "TabPaneView";

export default TabPaneView;
