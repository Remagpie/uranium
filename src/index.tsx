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
import {createUseStyles} from "react-jss";
import {Provider, useSelector} from "react-redux";

import PaneRenderer from "./components/PaneRenderer";
import store from "./store";
import {selectPaneList} from "./store/pane";

jss.use(jssGlobal());
jss.use(jssExtend());
jss.use(jssNested());
jss.use(jssCamelCase());
jss.use(jssDefaultUnit());
jss.use(jssExpand());
jss.use(jssPropsSort());

const useGlobalStyles = createUseStyles({
	"@global": {
		html: {
			width: "100%",
			height: "100%",
		},
		body: {
			width: "100%",
			height: "100%",
			margin: 0,
		},
		"#root": {
			width: "100%",
			height: "100%",
		},
	},
});

const App: FunctionComponent = () => {
	useGlobalStyles();

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
