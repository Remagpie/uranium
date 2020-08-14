import {h} from "preact";

import {createUseStyles} from "react-jss";

import useResetStyles from "./reset-style";

const useStyles = createUseStyles({
	root: {
		width: "100%",
		height: "100%",
	},
});

const App = () => {
	useResetStyles();

	const styles = useStyles();

	return <div className={styles.root}>Hello, World!</div>;
};
App.displayName = "App";

export default App;
