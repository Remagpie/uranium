import {h} from "preact";
import type {ComponentProps, FunctionComponent, VNode} from "preact";

import PaneView from "./PaneView";

type Props = {
	children: VNode<ComponentProps<typeof PaneView>>[];
};

const PaneRenderer: FunctionComponent<Props> = (props) => (
	<div>
		{props.children}
	</div>
);

export default PaneRenderer;
