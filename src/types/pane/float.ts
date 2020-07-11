import {immerable} from "immer";
import type {ComponentType} from "preact";
import {v4 as uuid} from "uuid";

import FloatPaneView from "#components/FloatPaneView";
import {BasePane} from "#types/pane/base";

export default class FloatPane implements BasePane {
	public static [immerable] = true as const;

	public id: BasePane["id"];
	public display: BasePane["display"];
	public children = [];
	public active?: BasePane["id"];
	public View = FloatPaneView as BasePane["View"];
	public Content: ComponentType;
	public style: Record<string, number | string>;

	public constructor(Content: FloatPane["Content"], style: FloatPane["style"]) {
		this.id = uuid();
		this.display = true;
		this.Content = Content;
		this.style = style;
	}
}
