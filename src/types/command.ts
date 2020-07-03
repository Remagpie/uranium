import {immerable} from "immer";

type CommandOption = {
	id: string;
	package: string;
	title: string;
	description: string;
};

export default class Command {
	public static [immerable] = true as const;

	public id: string;
	public package: string;
	public title: string;
	public description: string;

	public constructor(options: CommandOption) {
		this.id = options.id;
		this.package = options.package;
		this.title = options.title;
		this.description = options.description;
	}
}
