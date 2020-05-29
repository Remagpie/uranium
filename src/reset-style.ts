import {createUseStyles} from "react-jss";

export default createUseStyles({
	"@global": {
		body: {
			margin: 0,
		},
		textarea: {
			margin: 0,
			padding: 0,
			background: "none",
			color: "inherit",
			border: "none",
			font: "inherit",
			resize: "none",
		},
		":focus": {
			outline: "none",
		},
	},
});
