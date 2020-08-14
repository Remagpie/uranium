"use strict";

const electron = require("electron");

async function main() {
    await electron.app.whenReady();
    const win = new electron.BrowserWindow({
        webPreferences: {
            nodeIntegration: true,
        },
    });

  	win.loadURL("http://localhost:8080");
}

main();
