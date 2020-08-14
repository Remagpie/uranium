export type BasePane = {
	id: number;
	type: string;
	display: boolean;
	children: BasePane["id"][];
};
