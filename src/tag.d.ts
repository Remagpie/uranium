declare module preact {
	namespace h.JSX {
		// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
		interface IntrinsicElements {
			uapp: IntrinsicElements["div"];
			ubuffer: IntrinsicElements["div"];
			upalette: IntrinsicElements["div"];
			upane: IntrinsicElements["div"];
			utabbar: IntrinsicElements["div"];
		}
	}
}
