"use strict";

const electron = require("electron");
const path = require("path");

async function main() {
	await electron.app.whenReady();

	const win = new electron.BrowserWindow({
		webPreferences: {
			nodeIntegration: true,
			contextIsolation: false,
		},
	});

	win.loadFile(path.join(__dirname, "index.html"));
	win.webContents.openDevTools();
}

main();
