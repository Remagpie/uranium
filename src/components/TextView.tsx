import {h} from "preact";
import type {FunctionComponent} from "preact";

import type TextBuffer from "../types/buffer/text";

type Props = {
	buffer: TextBuffer;
};

const TextView: FunctionComponent<Props> = (props) => {
	const {buffer} = props;

	return (
		<textarea>
			{buffer.id}
		</textarea>
	);
};

export default TextView;
