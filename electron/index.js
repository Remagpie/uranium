const electron = require("electron");

async function main() {
	await electron.app.whenReady();

	electron.ipcMain.handle("dialog.open", async (_event, options) => {
		const {title} = options;

		return await electron.dialog.showOpenDialog({
			title,
			properties: ["openFile", "multiSelections"]
		});
	});

	const win = new electron.BrowserWindow({
		webPreferences: {
			nodeIntegration: true,
		},
	});

	win.loadURL("http://localhost:8080");
	win.webContents.openDevTools();
}

main();
