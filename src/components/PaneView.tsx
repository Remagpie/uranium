import {h} from "preact";
import type {FunctionComponent} from "preact";

import type Pane from "../types/pane";

type Props = {
	pane: Pane;
};

const PaneView: FunctionComponent<Props> = (props) => (
	// TODO: show active item
	<textarea>{props.pane.id}</textarea>
);

export default PaneView;
