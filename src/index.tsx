import {h, render} from "preact";
import type {FunctionComponent} from "preact";

import {Provider, useSelector} from "react-redux";

import PaneRenderer from "./components/PaneRenderer";
import store, {State} from "./store";

const App: FunctionComponent = () => {
	const panes = useSelector<State>((state) => Object.values(state.pane.pane));

	return (
		<PaneRenderer panes={panes as any} />
	);
};

const Root: FunctionComponent = () => (
	<Provider store={store}>
		<App />
	</Provider>
);

render(<Root />, document.getElementById("root")!);
