declare module preact {
	namespace h.JSX {
		// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
		interface IntrinsicElements {
			uapp: IntrinsicElements["div"];
			ubuffer: IntrinsicElements["div"];
			uchar: IntrinsicElements["div"];
			uline: IntrinsicElements["div"];
			upalette: IntrinsicElements["div"];
			upane: IntrinsicElements["div"];
			uspan: IntrinsicElements["div"];
			utabbar: IntrinsicElements["div"];
			utextarea: IntrinsicElements["div"];
			utoken: IntrinsicElements["div"];
		}
	}
}
