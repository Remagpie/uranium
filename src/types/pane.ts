import {v4 as uuid} from "uuid";

import {BaseBuffer} from "./buffer/base";

export default class Pane {
	public id: string;
	public buffer?: BaseBuffer["id"];

	public constructor(buffer?: BaseBuffer["id"]) {
		this.id = uuid();
		this.buffer = buffer;
	}
}
