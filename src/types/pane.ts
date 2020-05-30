import {v4 as uuid} from "uuid";

import {BaseBuffer} from "./buffer/base";

export default class Pane {
	public id: string;
	public items: BaseBuffer[];
	public active?: BaseBuffer["id"];

	public constructor(items: BaseBuffer[], active?: BaseBuffer["id"]) {
		this.id = uuid();
		this.items = items;
		this.active = active;
	}
}
