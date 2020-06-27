import {toChildArray} from "preact";
import type {VNode} from "preact";

class UrQuery {
	public vnode: VNode[];

	public constructor(...vnode: VNode[]) {
		this.vnode = vnode;
	}

	public append(child: VNode): UrQuery {
		this.vnode.forEach((vn) => {
			if (typeof vn.type === "string") {
				const children = vn.props.children;
				if (Array.isArray(children)) {
					children.push(child);
				} else if (children == null) {
					vn.props.children = child;
				} else {
					vn.props.children = [children, child];
				}
			} else {
				if (vn.__k == null) {
					vn.__k = [];
				}
				vn.__k.push(child);
			}
		});

		return this;
	}

	// TODO: Implement complex selector
	//       Current implementation only checks the type
	public find(selector: string): UrQuery {
		return $(...this.vnode.flatMap((vn) => {
			// Selector matched this component
			if (typeof vn.type === "string" && vn.type === selector) {
				return vn;
			}
			if (typeof vn.type !== "string" && vn.type.displayName === selector) {
				return vn;
			}

			// Traverse all the children elements
			if (typeof vn.type === "string") {
				return toChildArray(vn.props.children).flatMap((n) => {
					if (typeof n === "string" || typeof n === "number") {
						return [];
					} else {
						return $(n).find(selector).vnode;
					}
				});
			} else if (vn.__k != null) {
				return vn.__k.flatMap((n) => $(n).find(selector).vnode);
			} else {
				return [];
			}
		}));
	}
}

export default function $(...vnode: VNode[]): UrQuery {
	return new UrQuery(...vnode);
}

export function mergeClass(...classNames: Array<string | undefined>) {
	return classNames.filter((c) => c != null).join(" ");
}
