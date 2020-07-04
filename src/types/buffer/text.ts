import {promises as fs} from "fs";
import {immerable} from "immer";
import {v4 as uuid} from "uuid";

import TextBufferView from "#components/TextBufferView";
import {BaseBuffer} from "#types/buffer/base";

export default class TextBuffer implements BaseBuffer {
	public static [immerable] = true as const;

	public id: string;
	public content: string[];
	public file?: fs.FileHandle;
	public View = TextBufferView as BaseBuffer["View"];

	public static async open(path: string): Promise<TextBuffer> {
		const handle = await fs.open(path, "r+");
		const content = await handle.readFile("utf8");

		const buffer = new TextBuffer(content.split("\n"));
		buffer.file = handle;

		return buffer;
	}

	public constructor(lines: string[]) {
		this.id = uuid();
		this.content = lines;
	}
}
