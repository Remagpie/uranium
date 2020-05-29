import {h, render} from "preact";
import type {FunctionComponent} from "preact";

import {Provider, useSelector} from "react-redux";

import PaneRenderer from "./components/PaneRenderer";
import store from "./store";
import {selectPaneList} from "./store/pane";

const App: FunctionComponent = () => {
	const panes = useSelector(selectPaneList);

	return (
		<PaneRenderer panes={panes} />
	);
};

const Root: FunctionComponent = () => (
	<Provider store={store}>
		<App />
	</Provider>
);

render(<Root />, document.getElementById("root")!);
