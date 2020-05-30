import {h} from "preact";
import type {FunctionComponent} from "preact";

import {useSelector} from "react-redux";

import {selectBuffer} from "../store/buffer";
import type Pane from "../types/pane";
import EmptyView from "./EmptyView";

type Props = {
	pane: Pane;
};

const PaneView: FunctionComponent<Props> = (props) => {
	const {pane} = props;

	if (pane.active == null) {
		return <EmptyView />;
	} else {
		const buffer = useSelector(selectBuffer(pane.active));
		const View = buffer.view();

		return <View buffer={buffer} />;
	}
};

export default PaneView;
