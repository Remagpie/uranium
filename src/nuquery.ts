import type {VNode} from "preact";

class UrQuery {
	public vnode: VNode;

	public constructor(vnode: VNode) {
		this.vnode = vnode;
	}

	public append(child: VNode): UrQuery {
		const children = this.vnode.props.children;
		if (Array.isArray(children)) {
			children.push(child);
		} else if (children == null) {
			this.vnode.props.children = child;
		} else {
			this.vnode.props.children = [children, child];
		}

		return this;
	}
}

export default function $(vnode: VNode): UrQuery {
	return new UrQuery(vnode);
}

export function mergeClass(...classNames: Array<string | undefined>) {
	return classNames.filter((c) => c != null).join(" ");
}
