import {h} from "preact";

import {immerable} from "immer";
import {v4 as uuid} from "uuid";

import LeafPaneView from "../../components/LeafPaneView";
import {BaseBuffer} from "../buffer/base";
import {BasePane} from "./base";

export default class LeafPane implements BasePane {
	public static [immerable] = true as const;

	public id: string;
	public buffer: BaseBuffer["id"][];
	public children = [];

	public constructor() {
		this.id = uuid();
		this.buffer = [];
		this.children = [];
	}

	public View() {
		return <LeafPaneView pane={this} />;
	}
}
