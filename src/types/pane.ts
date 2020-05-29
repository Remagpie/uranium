import {v4 as uuid} from "uuid";

import {TextBuffer} from "./buffer";

export default class Pane {
	public id: string;
	public items: TextBuffer[];
	public active?: TextBuffer["id"];

	public constructor(items: TextBuffer[], active?: TextBuffer["id"]) {
		this.id = uuid();
		this.items = items;
		this.active = active;
	}
};
