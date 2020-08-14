import {BasePane} from "#types/pane/base";

export type StackPane = BasePane & {
	type: "stack";
	active?: BasePane["id"];
};
