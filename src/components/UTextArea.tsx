import {h} from "preact";
import type {FunctionComponent} from "preact";

import {useEffect, useRef} from "preact/hooks";
import {createUseStyles} from "react-jss";

import {mergeClass} from "../nuquery";

const useStyles = createUseStyles({
	root: {
		display: "block",
    whiteSpace: "pre",
	},
  input: {
    width: 0,
    overflow: "hidden",
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
  const spanRef = useRef<HTMLSpanElement>();

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
      const range = new Range();
      range.setStart(spanRef.current, offset);
      range.setEnd(spanRef.current, offset + 1);
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
    <utextarea className={mergeClass(styles.root, className)}>
      {lineNodes}
  		<input type="text" className={styles.input} />
    </utextarea>
	);
};
UInput.displayName = "UInput";

export default UInput;
