declare module preact {
	// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
	interface VNode {
		__k?: VNode<any>[];
	}
}
