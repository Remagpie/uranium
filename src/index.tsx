import {h, render} from "preact";

import jss from "jss";
import jssCamelCase from "jss-plugin-camel-case";
import jssDefaultUnit from "jss-plugin-default-unit";
import jssExpand from "jss-plugin-expand";
import jssExtend from "jss-plugin-extend";
import jssGlobal from "jss-plugin-global";
import jssNested from "jss-plugin-nested";
import jssPropsSort from "jss-plugin-props-sort";

import App from "./app";

jss.use(jssGlobal());
jss.use(jssExtend());
jss.use(jssNested());
jss.use(jssCamelCase());
jss.use(jssDefaultUnit());
jss.use(jssExpand());
jss.use(jssPropsSort());

render(<App />, document.getElementById("root")!);
