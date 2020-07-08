import {h} from "preact";
import type {FunctionComponent} from "preact";

import {useCallback, useEffect, useRef, useState} from "preact/hooks";
import {createUseStyles} from "react-jss";

import {mergeClass} from "../nuquery";

const useStyles = createUseStyles({
	root: {
		display: "block",
		whiteSpace: "pre",
	},
	input: {
		width: 100,
		backgroundColor: "white",
		height: "100%",
		overflow: "hidden",
	},
	cursor: {
		position: "absolute",
		border: [1, "solid", "red"],
	},
});

type Props = {
	className?: string;
	onChange?: (value: string) => void;
	onSelect?: (x: number, y: number) => void;
	cursor: [number, number];
	value: string[][];
};

const UInput: FunctionComponent<Props> = (props) => {
	const {className, cursor, onChange, onSelect, value} = props;

	const styles = useStyles();
	const inputRef = useRef<HTMLInputElement>(null);
	const spanRef = useRef<HTMLSpanElement>(null);
	const [compositionText, setCompositionText] = useState<string | null>(null);
	const [cursorRect, setCursorRect] = useState({
		top: 0,
		left: 0,
		width: 0,
		height: 0,
	});

	const onFocus = useCallback(() => inputRef.current?.focus(), [inputRef]);
	const onInputInput = useCallback((event: any) => console.log("INPUT", event, event.target.value), []);
	const onInputCompositionStart = useCallback(() => setCompositionText(""), []);
	const onInputCompositionEnd = useCallback(() => {
		const compositionResult = compositionText;
		setCompositionText(null);
	}, [compositionText]);

	// Calculate the cursor rect
	useEffect(() => {
		if (spanRef.current != null) {
			let offset = cursor[0];
			const line = value[cursor[1]];
			for (const token of line) {
				if (offset > token.length) {
					offset -= token.length;
				} else {
					break;
				}
			}

			const textNode = spanRef.current.childNodes[0];
			const range = new Range();
			range.setStart(textNode, offset);
			range.setEnd(textNode, offset + 1);
			const rect = range.getBoundingClientRect();
			setCursorRect({
				top: rect.top,
				left: rect.left,
				width: rect.width,
				height: rect.height,
			});
		}
	}, [cursor, spanRef, value]);

	const lineNodes = value.map((line, lineIndex) => {
		const tokenNodes = [];
		let lengthSum = 0;
		for (const token of line) {
			const hasCursor =
				lineIndex === cursor[1] &&
				lengthSum <= cursor[0] && cursor[0] < lengthSum + token.length;
			tokenNodes.push(<span ref={hasCursor ? spanRef : undefined}>{token}</span>);
		}
		return <div>{tokenNodes}</div>;
	});

	return (
		<utextarea className={mergeClass(styles.root, className)} onFocus={onFocus} tabIndex={-1}>
			{lineNodes}
			<div className={styles.cursor} style={cursorRect}>
				<input type="text" ref={inputRef} className={styles.input}
					onInput={onInputInput}
					oncompositionstart={onInputCompositionStart}
					oncompositionend={onInputCompositionEnd}
				/>
			</div>
		</utextarea>
	);
};
UInput.displayName = "UInput";

export default UInput;
