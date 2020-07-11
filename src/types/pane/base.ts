import type {FunctionComponent} from "preact";

export type BasePane = {
	id: string;
	display: boolean;
	children: BasePane["id"][];
	View: FunctionComponent<{
		className?: string;
		pane: BasePane;
	}>;
};
