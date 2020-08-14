"use strict";

const electron = require("electron");

async function main() {
    await electron.app.whenReady();
    new electron.BrowserWindow({
        webPreferences: {
            nodeIntegration: true,
        },
    });
}

main();
