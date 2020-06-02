import {h} from "preact";
import type {FunctionComponent} from "preact";

import TextBuffer from "../types/buffer/text";

type Props = {
	buffer: TextBuffer;
};

const TextView: FunctionComponent<Props> = (props) => {
	const {buffer} = props;

	return (
		<textarea>
			{buffer.content}
		</textarea>
	);
};

export default TextView;
