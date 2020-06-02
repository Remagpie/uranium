import type {ThunkAction} from "../store";

type CommandOption = {
	id: string;
	package: string;
	title: string;
	description: string;
	thunk: ThunkAction<any>;
};

export default class Command {
	public id: string;
	public package: string;
	public title: string;
	public description: string;
	public thunk: ThunkAction<any>;

	public constructor(options: CommandOption) {
		this.id = options.id;
		this.package = options.package;
		this.title = options.title;
		this.description = options.description;
		this.thunk = options.thunk;
	}
}
