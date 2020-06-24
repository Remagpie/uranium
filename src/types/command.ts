import {immerable} from "immer";

import type {ThunkAction} from "#store";

type CommandOption = {
	id: string;
	package: string;
	title: string;
	description: string;
	action: ThunkAction<any>;
};

export default class Command {
	public static [immerable] = true as const;

	public id: string;
	public package: string;
	public title: string;
	public description: string;
	public action: CommandOption["action"];

	public constructor(options: CommandOption) {
		this.id = options.id;
		this.package = options.package;
		this.title = options.title;
		this.description = options.description;
		this.action = options.action;
	}
}
