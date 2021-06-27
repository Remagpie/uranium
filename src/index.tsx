import {h, render} from "preact";

import App from "./app";

const Root = () => <App />;
Root.displayName = "Root";

render(<Root />, document.getElementById("root")!);
