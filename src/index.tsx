import {h, render} from "preact";
import type {FunctionComponent} from "preact";

import {Provider} from "react-redux";

import store from "./store";

const App: FunctionComponent = () => (
	<Provider store={store}>
		<h1>Hello, World!</h1>
	</Provider>
);

render(<App />, document.getElementById("root")!);
