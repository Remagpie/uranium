import {render} from "react-dom";

import {create as createJss} from "jss";
import jssCamelCase from "jss-plugin-camel-case";
import jssDefaultUnit from "jss-plugin-default-unit";
import jssGlobal from "jss-plugin-global";
import jssNested from "jss-plugin-nested";
import {JssProvider} from "react-jss";

import App from "./app";

const jss = createJss();
jss.use(jssCamelCase());
jss.use(jssDefaultUnit());
jss.use(jssGlobal());
jss.use(jssNested());

const Root = () => (
	<JssProvider jss={jss}>
		<App />
	</JssProvider>
);
Root.displayName = "Root";

render(<Root />, document.getElementById("root"));
