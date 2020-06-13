import type {FunctionComponent} from "preact";

export type BasePane = {
	id: string;
	children: BasePane[];
	View: FunctionComponent
};
