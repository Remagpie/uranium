import {h} from "preact";
import type {VNode} from "preact";

import produce from "immer";
import {createUseStyles} from "react-jss";
import {useSelector} from "react-redux";
import {createSelector} from "reselect";
import {createAction, createReducer} from "typesafe-actions";
import type {ActionType} from "typesafe-actions";

import $ from "../../nuquery";
import {deleteReducer, putReducer} from "../../store";
import type {Dispatch, State as RootState} from "../../store";
import {deleteCommand, putCommand} from "../../store/command";
import {deleteRootHook, putRootHook} from "../../store/pane";
import Command from "../../types/command";

export type State = {
	show: boolean;
};

const initialState: State = {
	show: false,
};

// eslint-disable-next-line @typescript-eslint/no-unsafe-return
export const selectState = (state: RootState): State => state["command-palette"];
export const selectShow = createSelector(selectState, (state) => state.show);

export const putShow = createAction("command-palette/show/put")<boolean>();
export const toggleShow = createAction("command-palette/show/toggle")();

type Action =
	| ActionType<typeof putShow>
	| ActionType<typeof toggleShow>;

const reducer = createReducer<State, Action>(initialState, {
	"command-palette/show/put": (state, action) => produce(state, (s) => {
		const show = action.payload;
		s.show = show;
	}),
	"command-palette/show/toggle": (state) => produce(state, (s) => {
		s.show = !s.show;
	}),
});

const useStyles = createUseStyles({
	root: {
		display: "block",
		position: "absolute",
		width: 100,
		height: 100,
	},
});

const toggleCommand = new Command({
	id: "command-palette/toggle",
	package: "command-palette",
	title: "Command Palette: Toggle",
	description: "",
	thunk: (dispatch) => dispatch(toggleShow()),
});

function rootPaneHook(vnode: VNode): VNode {
	const styles = useStyles();
	const show = useSelector(selectShow);

	if (show) {
		return $(vnode).append(<upalette className={styles.root} />).vnode;
	} else {
		return vnode;
	}
}

export default function effect(dispatch: Dispatch) {
	dispatch(putReducer("command-palette", reducer));
	dispatch(putCommand(toggleCommand));
	dispatch(putRootHook(rootPaneHook));

	return function () {
		dispatch(deleteRootHook(rootPaneHook));
		dispatch(deleteCommand(toggleCommand.id));
		dispatch(deleteReducer("command-palette"));
	};
}
