import {v4 as uuid} from "uuid";

import TextView from "../../components/TextView";
import {BaseBuffer} from "./base";

export default class TextBuffer implements BaseBuffer {
	public id: string;

	public constructor() {
		this.id = uuid();
	}

	public view(): typeof TextView {
		return TextView;
	}
}
