import {createUseStyles} from "react-jss";

export default createUseStyles({
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
		input: {
			margin: 0,
			padding: 0,
			border: "none",

			"&:focus": {
				outline: "none",
			},
		},

		":focus": {
			outline: "none",
		},
	},
});
