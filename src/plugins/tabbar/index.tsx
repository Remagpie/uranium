import {h} from "preact";
import type {VNode} from "preact";

import {createUseStyles} from "react-jss";

import $ from "../../nuquery";
import type {Dispatch} from "#store";
import {deleteBufferHook, putBufferHook} from "#store/pane";
import BufferPane from "#types/pane/buffer";
import Tabbar from "./components/Tabbar";

const useStyles = createUseStyles({
	root: {
		flex: [0, 0, "auto"],
	},
});

function bufferPaneHook(vnode: VNode, pane: BufferPane) {
	const styles = useStyles();

	$(vnode).find("upane").prepend(<Tabbar className={styles.root} pane={pane} />);
}

export default function effect(dispatch: Dispatch) {
	dispatch(putBufferHook(bufferPaneHook));

	return function () {
		dispatch(deleteBufferHook(bufferPaneHook));
	};
}
