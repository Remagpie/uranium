export type Keymap = {
	children: Map<string, Keymap>;
	binding?: {
		command: string;
		priority: number;
	};
};
