import produce from "immer";
import {createSelector} from "reselect";
import {createAction, createReducer} from "typesafe-actions";
import type {ActionType} from "typesafe-actions";

import type {State as RootState, ThunkAction} from "#store";
import {runCommand} from "#store/command";
import Command from "#types/command";
import {normalizeEvent} from "./stroke";
import {Keymap} from "./types";

export type State = {
	pending: string[];
	keymap: Map<string, Map<string, Keymap>>; // group -> selector -> Keymap
};

const initialState: State = {
	pending: [],
	keymap: new Map(),
};

// eslint-disable-next-line @typescript-eslint/no-unsafe-return
export const selectState = (state: RootState): State => state.keymap;
export const selectPending = createSelector(selectState, (state) => state.pending);
export const selectKeymapMap = createSelector(selectState, (state) => state.keymap);
export const selectKeymapGroupList = createSelector(
	selectKeymapMap,
	(state) => Array.from(state.values()),
);

export const putKeymap = createAction("keymap/put")<{
	group: string;
	key: string[];
	selector: string;
	command: Command["id"];
}>();
export const deleteKeymapGroup = createAction("keymap/group/delete")<string>();
export const clearPending = createAction("keymap/pending/clear")();
export const pushPending = createAction("keymap/pending/push")<string>();

export function applyEvent(event: KeyboardEvent): ThunkAction<boolean> {
	return (dispatch, getState) => {
		const state = getState();
		const pending = selectPending(state);
		const stroke = normalizeEvent(event);

		const keymapGroups = selectKeymapGroupList(state);
		const validKeymaps: Keymap[] = [];
		for (const group of keymapGroups) {
			group.forEach((keymap, selector) => {
				if ((event.target as Element).closest(selector) != null) {
					validKeymaps.push(keymap);
				}
			});
		}

		let matches = validKeymaps;
		for (const key of [...pending, stroke]) {
			matches = matches.reduce((acc: typeof matches, keymap) => {
				if (keymap.children.has(key)) {
					acc.push(keymap.children.get(key)!);
				}
				return acc;
			}, []);
		}

		const leaves = matches.filter((keymap) => keymap.binding != null);

		if (matches.length === 0) {
			// Reset the pending array if no match was found
			dispatch(clearPending());
			return false;
		} else if (leaves.length === 0) {
			// Register the pending key and return if no leaf binding was found
			dispatch(pushPending(stroke));
			return true;
		} else {
			// Reset the pending array and execute the command if the leaf was found
			dispatch(clearPending());
			const command = leaves.reduce(
				(acc, c) => acc.binding!.priority > c.binding!.priority ? acc : c,
				leaves[0],
			);
			dispatch(runCommand(command.binding!.command));
			return true;
		}
	};
}

export type Action =
	| ActionType<typeof putKeymap>
	| ActionType<typeof deleteKeymapGroup>
	| ActionType<typeof clearPending>
	| ActionType<typeof pushPending>;

let priority = 0;
export const reducer = createReducer<State, Action>(initialState, {
	"keymap/put": (state, action) => produce(state, (s) => {
		const {group, key, selector, command} = action.payload;
		if (!s.keymap.has(group)) {
			s.keymap.set(group, new Map());
		}
		const keymapGroup = s.keymap.get(group)!;
		if (!keymapGroup.has(selector)) {
			keymapGroup.set(selector, {children: new Map()});
		}
		const keymap = keymapGroup.get(selector)!;
		let leaf = keymap;
		for (const k of key) {
			if (!leaf.children.has(k)) {
				leaf.children.set(k, {children: new Map()});
			}
			leaf = leaf.children.get(k)!;
		}
		leaf.binding = {
			command,
			priority,
		};
		priority += 1;
	}),
	"keymap/group/delete": (state, action) => produce(state, (s) => {
		const group = action.payload;
		s.keymap.delete(group);
	}),
	"keymap/pending/clear": (state) => produce(state, (s) => {
		s.pending = [];
	}),
	"keymap/pending/push": (state, action) => produce(state, (s) => {
		const stroke = action.payload;
		s.pending.push(stroke);
	}),
});
