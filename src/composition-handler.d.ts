declare module preact {
	namespace h.JSX {
		// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
		interface DOMAttributes<Target extends EventTarget> {
			oncompositionstart?: DOMAttributes<Target>["onCompositionStart"];
			oncompositionupdate?: DOMAttributes<Target>["onCompositionUpdate"];
			oncompositionend?: DOMAttributes<Target>["onCompositionEnd"];
		}
	}
}
