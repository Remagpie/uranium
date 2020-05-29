import {h} from "preact";
import type {FunctionComponent} from "preact";

import type {Pane} from "../types/pane";
import PaneView from "./PaneView";

type Props = {
	panes: Pane[];
};

const PaneRenderer: FunctionComponent<Props> = (props) => (
	<div>
		{props.panes.map((pane) => <PaneView pane={pane} />)}
	</div>
);

export default PaneRenderer;
