const electron = require("electron");

async function main() {
	await electron.app.whenReady();

	const win = new electron.BrowserWindow({
		webPreferences: {
			nodeIntegration: true,
		},
	});

	win.loadFile("index.html");
	win.webContents.openDevTools();
}

main();
