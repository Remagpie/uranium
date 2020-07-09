import {promises as fs} from "fs";
import {immerable} from "immer";
import {v4 as uuid} from "uuid";

import TextBufferView from "#components/TextBufferView";
import {BaseBuffer} from "#types/buffer/base";

type Token = string;
type Line = Token[];

export default class TextBuffer implements BaseBuffer {
	public static [immerable] = true as const;

	public id: string;
	public View = TextBufferView as BaseBuffer["View"];
	public content: Line[];
	public file?: fs.FileHandle;
	public cursor: [number, number];
	public compositionCheckpoint?: TextBuffer;

	public static async open(path: string): Promise<TextBuffer> {
		const handle = await fs.open(path, "r+");
		const content = await handle.readFile("utf8");

		const buffer = new TextBuffer(content.split("\n").map((line) => [line]));
		buffer.file = handle;

		return buffer;
	}

	public constructor(content: TextBuffer["content"]) {
		this.id = uuid();
		this.content = content;
		this.cursor = [0, 0];
	}

	public clone(): TextBuffer {
		const newContent = this.content.map((line) => line.slice());
		const result = new TextBuffer(newContent);
		result.id = this.id;
		result.cursor[0] = this.cursor[0];
		result.cursor[1] = this.cursor[1];
		result.file = this.file;
		result.compositionCheckpoint = this.compositionCheckpoint;

		return result;
	}

	public moveCursor(xDiff: number, yDiff: number) {
		this.cursor[1] =
			Math.max(0, Math.min(this.cursor[1] + yDiff, this.content.length - 1));

		const lineLength = this.content[this.cursor[1]].reduce((acc, val) => acc + val.length, 0);
		this.cursor[0] = Math.max(0, Math.min(this.cursor[0] + xDiff, lineLength - 1));
	}

	public isComposing() {
		return this.compositionCheckpoint != null;
	}

	public startComposition() {
		this.compositionCheckpoint = this.clone();
	}

	public finishComposition() {
		this.compositionCheckpoint = undefined;
	}

	public insert(data: string) {
		if (this.compositionCheckpoint != null) {
			const newBuffer = this.compositionCheckpoint.clone();
			newBuffer.insert(data);
			this.content = newBuffer.content;
		} else {
			const line = this.content[this.cursor[1]];
			let offset = this.cursor[0];
			for (let i = 0; i < line.length; ++i) {
				const token = line[i];
				if (offset > token.length) {
					offset -= token.length;
				} else {
					line[i] = token.substring(0, offset) + data + token.substring(offset);
				}
			}
		}
	}
}
