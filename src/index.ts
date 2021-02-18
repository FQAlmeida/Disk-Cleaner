import { app, BrowserWindow, BrowserWindowConstructorOptions, ipcMain } from "electron";
declare const MAIN_WINDOW_WEBPACK_ENTRY: string;

import installExtension, { REDUX_DEVTOOLS, REACT_DEVELOPER_TOOLS } from "electron-devtools-installer";
import {  ExpressionsRetrieveChannel, ExpressionsSaveChannel } from "./ipc/expressions/expression.ipc.main";
import { IpcChannelInterface } from "./ipc/types/IpcChannelInterface";

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) { // eslint-disable-line global-require
    app.quit();
}

class Main {
    init(ipcChannels: IpcChannelInterface[]) {
        app.on("ready", this.createWindow);
        app.on("window-all-closed", this.onWindowAllClosed);
        app.on("activate", this.onActivate);
        this.registerIpcChannels(ipcChannels);
    }
    private createWindow(): void {
        const browser_options: BrowserWindowConstructorOptions = {
            height: 1024,
            width: 1680,
            // eslint-disable-next-line @typescript-eslint/naming-convention
            webPreferences: { nodeIntegration: true }
        };
        const mainWindow = new BrowserWindow(browser_options);
        mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);
        mainWindow.webContents.openDevTools();
    }
    private onWindowAllClosed() {
        if (process.platform !== "darwin") {
            app.quit();
        }
    }
    private onActivate() {
        if (BrowserWindow.getAllWindows().length === 0) {
            this.createWindow();
        }
    }
    private registerIpcChannels(ipcChannels: IpcChannelInterface[]) {
        ipcChannels.forEach(channel => ipcMain.on(channel.getName(), (event, request) => channel.handle(event, request)));
    }
}

app.whenReady().then(() => {
    installExtension(REDUX_DEVTOOLS)
        .then((name) => console.log(`Added Extension:  ${name}`))
        .catch((err) => console.log("An error occurred: ", err));
    installExtension(REACT_DEVELOPER_TOOLS)
        .then((name) => console.log(`Added Extension:  ${name}`))
        .catch((err) => console.log("An error occurred: ", err));
});

(new Main()).init([
    new ExpressionsRetrieveChannel(),
    new ExpressionsSaveChannel()
]);
