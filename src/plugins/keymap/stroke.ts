export function normalizeEvent(event: KeyboardEvent): string {
	let stroke = "";

	// TODO: handle keyup
	if (event.shiftKey) {
		stroke += "S-";
	}
	if (event.ctrlKey) {
		stroke += "C-";
	}
	if (event.altKey) {
		stroke += "A-";
	}
	if (event.metaKey) {
		stroke += "M-";
	}
	switch (event.code) {
		case "KeyA": stroke += "a"; break;
		case "KeyB": stroke += "b"; break;
		case "KeyC": stroke += "c"; break;
		case "KeyD": stroke += "d"; break;
		case "KeyE": stroke += "e"; break;
		case "KeyF": stroke += "f"; break;
		case "KeyG": stroke += "g"; break;
		case "KeyH": stroke += "h"; break;
		case "KeyI": stroke += "i"; break;
		case "KeyJ": stroke += "j"; break;
		case "KeyK": stroke += "k"; break;
		case "KeyL": stroke += "l"; break;
		case "KeyM": stroke += "m"; break;
		case "KeyN": stroke += "n"; break;
		case "KeyO": stroke += "o"; break;
		case "KeyP": stroke += "p"; break;
		case "KeyQ": stroke += "q"; break;
		case "KeyR": stroke += "r"; break;
		case "KeyS": stroke += "s"; break;
		case "KeyT": stroke += "t"; break;
		case "KeyU": stroke += "u"; break;
		case "KeyV": stroke += "v"; break;
		case "KeyW": stroke += "w"; break;
		case "KeyX": stroke += "x"; break;
		case "KeyY": stroke += "y"; break;
		case "KeyZ": stroke += "z"; break;
		case "Enter": stroke += "RET"; break;
		case "ArrowUp": stroke += "<up>"; break;
		case "ArrowDown": stroke += "<down>"; break;
		case "ArrowLeft": stroke += "<left>"; break;
		case "ArrowRight": stroke += "<right>"; break;
		// TODO: Throw a better error
		default: stroke += "UNKNOWN"; break;
	}

	return stroke;
}
