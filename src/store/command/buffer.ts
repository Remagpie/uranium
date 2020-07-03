import Command from "#types/command";

export const openFile = new Command({
	id: "buffer/open-file",
	package: "buffer",
	title: "Open a file",
	description: "",
	action: async () => { /* TODO: open file in any tab view */ },
});
