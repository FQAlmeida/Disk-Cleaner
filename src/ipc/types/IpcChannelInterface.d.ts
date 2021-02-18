import { IpcMainEvent } from "electron";
import { name_channels } from "../ipc_channels.type";

export type RequestParms<T> = T | Array<T> | undefined

export interface IpcRequest<T = unknown> {
  response_channel?: string;

  params?: RequestParms<T>;
}

export interface IpcChannelInterface<T = unknown> {
  getName(): name_channels;

  handle(event: IpcMainEvent, request: IpcRequest<T>): void;
}
