import {useEffect} from "preact/hooks";

import {deleteReducer, putReducer, useDispatch} from "#store";
import * as store from "./store";

const ProjectPlugin = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(putReducer("project", store.reducer));

		return function () {
			deleteReducer("keymap");
		};
	}, []);

	return null;
};
ProjectPlugin.displayName = "ProjectPlugin";

export default ProjectPlugin;
