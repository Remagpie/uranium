import {h} from "preact";
import type {ComponentProps} from "preact";

import {immerable} from "immer";
import {v4 as uuid} from "uuid";

import BufferPaneView from "#components/BufferPaneView";
import {BaseBuffer} from "#types/buffer/base";
import {BasePane} from "#types/pane/base";

export default class BufferPane implements BasePane {
	public static [immerable] = true as const;

	public id: string;
	public buffer: BaseBuffer["id"];
	public children = [];

	public constructor(buffer: BaseBuffer["id"]) {
		this.id = uuid();
		this.buffer = buffer;
		this.children = [];
	}

	public View(props: ComponentProps<BasePane["View"]>) {
		const {className} = props;

		return <BufferPaneView className={className} pane={this} />;
	}
}
