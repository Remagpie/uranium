import type {FunctionComponent} from "preact";

export type BaseBuffer = {
	id: string;
	// TODO: Generalize this to AnyComponent
	view: () => FunctionComponent<{buffer: BaseBuffer}>;
};
