type CommandOption = {
	id: string;
	package: string;
	title: string;
	description: string;
	action: string;
};

export default class Command {
	public id: string;
	public package: string;
	public title: string;
	public description: string;
	public action: string;

	public constructor(options: CommandOption) {
		this.id = options.id;
		this.package = options.package;
		this.title = options.title;
		this.description = options.description;
		this.action = options.action;
	}
}
