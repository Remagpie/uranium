import {h, render} from "preact";
import type {FunctionComponent} from "preact";

import jss from "jss";
import jssCamelCase from "jss-plugin-camel-case";
import jssDefaultUnit from "jss-plugin-default-unit";
import jssExpand from "jss-plugin-expand";
import jssExtend from "jss-plugin-extend";
import jssGlobal from "jss-plugin-global";
import jssNested from "jss-plugin-nested";
import jssPropsSort from "jss-plugin-props-sort";
import {Provider} from "react-redux";

import App from "./app";
import store from "./store";

jss.use(jssGlobal());
jss.use(jssExtend());
jss.use(jssNested());
jss.use(jssCamelCase());
jss.use(jssDefaultUnit());
jss.use(jssExpand());
jss.use(jssPropsSort());

const Root: FunctionComponent = () => (
	<Provider store={store}>
		<App />
	</Provider>
);

render(<Root />, document.getElementById("root")!);
