import { ipcMain } from "electron";
import { TypedIpcMain } from "electron-typed-ipc";
import { Commands, Events } from "../expressions";
export const typedIpcMain = ipcMain as TypedIpcMain<Events, Commands>;
