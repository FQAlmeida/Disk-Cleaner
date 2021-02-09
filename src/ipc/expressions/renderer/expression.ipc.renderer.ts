import { ipcRenderer } from "electron";
import { TypedIpcRenderer } from "electron-typed-ipc";
import { Commands, Events } from "../expressions";

export const typedIpcRenderer = ipcRenderer as TypedIpcRenderer<Events, Commands>;
