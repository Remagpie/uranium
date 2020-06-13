import {h} from "preact";

import {promises as fs} from "fs";
import {immerable} from "immer";
import {v4 as uuid} from "uuid";

import TextView from "../../components/TextView";
import {BaseBuffer} from "./base";

export default class TextBuffer implements BaseBuffer {
	public static [immerable] = true as const;

	public id: string;
	public content: string;
	public file?: fs.FileHandle;

	public static async open(path: string): Promise<TextBuffer> {
		const handle = await fs.open(path, "r+");
		const content = await handle.readFile("utf8");

		const buffer = new TextBuffer(content);
		buffer.file = handle;

		return buffer;
	}

	public constructor(content: string) {
		this.id = uuid();
		this.content = content;

		this.View = this.View.bind(this);
	}

	public View() {
		return <TextView buffer={this} />;
	}
}
