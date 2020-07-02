import type {FunctionComponent} from "preact";

export type BasePane = {
	id: string;
	children: BasePane["id"][];
	View: FunctionComponent<{className?: string}>;
};
