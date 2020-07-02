import {h} from "preact";
import type {ComponentProps} from "preact";

import {immerable} from "immer";
import {v4 as uuid} from "uuid";

import TabPaneView from "#components/TabPaneView";
import {BasePane} from "#types/pane/base";

export default class TabPane implements BasePane {
	public static [immerable] = true as const;

	public id: BasePane["id"];
	public children: BasePane["children"] = [];
	public active?: BasePane["id"];

	public constructor() {
		this.id = uuid();
		this.children = [];
	}

	public View(props: ComponentProps<BasePane["View"]>) {
		const {className} = props;

		return <TabPaneView className={className} pane={this} />;
	}
}
