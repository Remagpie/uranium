import useResetStyles from "./reset-style";

const App = () => {
	useResetStyles();

	return <span>Hello, World!</span>;
};
App.displayName = "App";

export default App;
