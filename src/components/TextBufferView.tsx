import {h} from "preact";
import type {FunctionComponent, Ref} from "preact";

import {forwardRef} from "preact/compat";
import {useCallback, useEffect, useRef, useState} from "preact/hooks";
import {createUseStyles} from "react-jss";

import * as hooks from "../hooks";
import {mergeClass} from "../nuquery";
import {useDispatch} from "#store";
import {patchBuffer} from "#store/buffer";
import TextBuffer from "#types/buffer/text";

const useStyles = createUseStyles({
	root: {
		display: "block",
	},
	body: {
		display: "block",
		whiteSpace: "pre",
	},
	cursor: {
		position: "absolute",
		border: [1, "solid", "black"],
	},
	input: {
		width: 0,
		height: "100%",
	},
});

type Props = {
	className?: string;
	buffer: TextBuffer;
};

const TextBufferView: FunctionComponent<Props> = forwardRef((props, ref: Ref<HTMLDivElement>) => {
	const {buffer, className} = props;

	const dispatch = useDispatch();
	const styles = useStyles();
	const bufferRef = hooks.useChainedRef(ref);
	const bodyRef = useRef<HTMLDivElement>(null);
	const inputRef = useRef<HTMLInputElement>(null);
	const [inputValue, setInputValue] = useState("");
	const [cursorRect, setCursorRect] = useState({
		top: 0,
		left: 0,
		width: 0,
		height: 0,
	});

	hooks.useCommandEvent(bufferRef, {
		"core/move-up": () => dispatch(patchBuffer<TextBuffer>(buffer.id, (b) => b.moveCursor(0, -1))),
		"core/move-down": () => dispatch(patchBuffer<TextBuffer>(buffer.id, (b) => b.moveCursor(0, 1))),
		"core/move-left": () => {
			dispatch(patchBuffer<TextBuffer>(buffer.id, (b) => b.moveCursor(-1, 0)));
		},
		"core/move-right": () => {
			dispatch(patchBuffer<TextBuffer>(buffer.id, (b) => b.moveCursor(1, 0)));
		},
	}, [buffer.id]);

	useEffect(() => {
		if (bodyRef.current == null) {
			return;
		}

		const element = bodyRef.current;
		const tokenList = element.querySelectorAll("utoken");

		// Find the start of the line
		let lineCount = 0;
		let lineStart = 0;
		for (let i = 0; i < tokenList.length; ++i) {
			const token = tokenList[i];
			if (token.getAttribute("type") === "eol") {
				lineCount += 1;
				if (lineCount === buffer.cursor[1]) {
					lineStart = i + 1;
				}
			}
		}

		let offset = buffer.cursor[0];
		for (let i = lineStart; ; ++i) {
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
				});
				break;
			}
		}
	}, [buffer, bodyRef]);

	const onFocus = useCallback(() => inputRef?.current.focus(), [inputRef]);
	const onCompositionStart = useCallback(() => {
		dispatch(patchBuffer<TextBuffer>(buffer.id, (b) => b.startComposition()));
		setInputValue("");
	}, [buffer]);
	const onInput = useCallback((event: InputEvent) => {
		const data = event.data ?? "";
		let xDiff: number;
		if (buffer.isComposing()) {
			setInputValue(data);
			xDiff = buffer.compositionCheckpoint!.cursor[0] + data.length - buffer.cursor[0];
		} else {
			xDiff = 1;
		}
		dispatch(patchBuffer<TextBuffer>(buffer.id, (b) => {
			b.insert(data);
			b.cursor[0] += xDiff;
		}));
	}, [buffer]);
	const onCompositionEnd = useCallback(() => {
		dispatch(patchBuffer<TextBuffer>(buffer.id, (b) => b.finishComposition()));
		setInputValue("");
	}, [buffer]);

	const lineNodes = buffer.content.map((line) => {
		const tokenNodes = line.map((token) => <utoken>{token}</utoken>);

		return (
			<div>
				{tokenNodes}
				<utoken type="eol">{" "}</utoken>
			</div>
		);
	});

	return (
		<ubuffer
			type="text"
			className={mergeClass(styles.root, className)}
			ref={bufferRef}
			tabIndex={-1}
		>
			<div
				className={styles.body}
				ref={bodyRef}
				tabIndex={-1}
				onFocus={onFocus}
				oncompositionstart={onCompositionStart}
				onInput={onInput as (event: Event) => void}
				oncompositionend={onCompositionEnd}
			>
				{lineNodes}
				<div className={styles.cursor} style={cursorRect}>
					<input type="text" className={styles.input} ref={inputRef} value={inputValue} />
				</div>
			</div>
		</ubuffer>
	);
});
TextBufferView.displayName = "TextBufferView";

export default TextBufferView;
