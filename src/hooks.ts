import type {Ref, RefObject} from "preact";

import {useCallback, useEffect, useRef, useState} from "preact/hooks";
import type {Inputs} from "preact/hooks";

import Command from "#types/command";

export function useChainedRef<T>(ref: Ref<T> | null) {
	const chainedRef = useRef<T>(null);
	useEffect(() => {
		if (ref != null) {
			if (typeof ref === "function") {
				ref(chainedRef.current);
			} else {
				ref.current = chainedRef.current;
			}
		}
	}, [chainedRef, ref]);

	return chainedRef;
}

export function useCommandEvent(
	ref: RefObject<HTMLElement>,
	callbackMap: Record<string, (command: Command) => void>,
	deps: Inputs,
) {
	const onCommand = useCallback((event: Event) => {
		if (!(event instanceof CustomEvent && event.detail instanceof Command)) {
			return;
		}

		const command = event.detail;
		for (const [id, callback] of Object.entries(callbackMap)) {
			if (id === command.id) {
				callback(command);
				event.stopImmediatePropagation();
			}
		}
	}, deps);

	useEffect(() => {
		ref.current?.addEventListener("command", onCommand);

		return () => {
			ref.current?.removeEventListener("command", onCommand);
		};
	}, [onCommand, ref]);
}

export function useFocusEffect(ref: RefObject<HTMLElement>) {
	const [handled, setHandled] = useState(false);
	if (!handled) {
		useEffect(() => {
			if (ref.current != null) {
				ref.current.focus();
				setHandled(true);
			}
		}, [ref]);
	}
}
