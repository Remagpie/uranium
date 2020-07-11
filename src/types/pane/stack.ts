import {immerable} from "immer";
import {v4 as uuid} from "uuid";

import StackPaneView from "#components/StackPaneView";
import {BasePane} from "#types/pane/base";

export default class FloatPane implements BasePane {
	public static [immerable] = true as const;

	public id: BasePane["id"];
	public display: BasePane["display"];
	public children: BasePane["children"];
	public active?: BasePane["id"];
	public View = StackPaneView as BasePane["View"];

	public constructor() {
		this.id = uuid();
		this.display = true;
		this.children = [];
	}
}
