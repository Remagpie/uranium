import type {FunctionComponent} from "preact";

export type BaseBuffer = {
	id: string;
	View: FunctionComponent<{
		className?: string;
		buffer: BaseBuffer;
	}>;
};
