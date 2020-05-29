import {TextBuffer} from "./buffer";

export type Pane = {
	id: string;
	items: TextBuffer[];
	active?: TextBuffer["id"];
};
