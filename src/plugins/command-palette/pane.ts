import {immerable} from "immer";
import {v4 as uuid} from "uuid";

import CommandPalettePaneView from "./components/CommandPalettePaneView";
import {BasePane} from "#types/pane/base";

export default class CommandPalettePane implements BasePane {
	public static [immerable] = true as const;

	public id: BasePane["id"];
	public display: BasePane["display"];
	public children = [];
	public active?: BasePane["id"];
	public View = CommandPalettePaneView as BasePane["View"];

	public constructor() {
		this.id = uuid();
		this.display = true;
	}
}
