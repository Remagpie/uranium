import {h} from "preact";
import type {FunctionComponent} from "preact";

import {useEffect, useRef, useState} from "preact/hooks";
import {createUseStyles} from "react-jss";

import {mergeClass} from "../nuquery";

const useStyles = createUseStyles({
	root: {
		display: "block",
		whiteSpace: "pre",
	},
	cursor: {
		position: "absolute",
		backgroundColor: "red",
	},
	input: {
		width: 0,
		height: "100%",
	},
});

type Props = {
	className?: string;
	value: string[][];
	onCompositionStart?: () => void;
	onInput?: h.JSX.IntrinsicElements["input"]["onInput"];
	onCompositionEnd?: () => void;
	cursor: [number, number]
};

const UTextArea: FunctionComponent<Props> = (props) => {
	const {className, cursor, value, onInput} = props;

	const styles = useStyles();
	const ref = useRef<HTMLDivElement>(null);
	const [cursorRect, setCursorRect] = useState({
		top: 0,
		left: 0,
		width: 0,
		height: 0,
	});

	const lineNodes = value.map((line) => {
		const tokenNodes = line.map((token) => <utoken>{token}</utoken>);

		return (
			<div>
				{tokenNodes}
				<utoken type="eol">{" "}</utoken>
			</div>
		);
	});

	useEffect(() => {
		if (ref.current == null) {
			return;
		}

		const element = ref.current;
		const tokenList = element.querySelectorAll("utoken");

		// Find the start of the line
		let lineCount = 0;
		let lineStart = 0;
		for (let i = 0; i < tokenList.length; ++i) {
			const token = tokenList[i];
			if (token.getAttribute("type") === "eol") {
				lineCount += 1;
				if (lineCount === cursor[1]) {
					lineStart = i + 1;
				}
			}
		}

		let offset = cursor[0];
		for (let i = lineStart;; ++i) {
			const token = tokenList[i];
			const textNode = token.childNodes[0];
			const text = textNode.textContent ?? "";
			if (offset > text.length) {
				offset -= text.length;
			} else {
				const range = new Range();
				range.setStart(textNode, offset);
				range.setEnd(textNode, offset + 1);
				const rect = range.getBoundingClientRect();
				setCursorRect({
					top: rect.top,
					left: rect.left,
					width: rect.width,
					height: rect.height,
				})
				break;
			}
		}
	}, [cursor, ref, setCursorRect]);

	return (
		<utextarea className={mergeClass(styles.root, className)} ref={ref}>
			{lineNodes}
			<div className={styles.cursor} style={cursorRect}>
				<input
					className={styles.input}
					type="text"
					onInput={onInput}
				/>
			</div>
		</utextarea>
	);
};
UTextArea.displayName = "UTextArea";

export default UTextArea;
