import { IpcMainEvent } from "electron";

export type RequestParms<T> = T | Array<T> | undefined

export interface IpcRequest<T = unknown> {
  response_channel?: string;

  params?: RequestParms<T>;
}

export interface IpcChannelInterface<T = unknown> {
  getName(): string;

  handle(event: IpcMainEvent, request: IpcRequest<T>): void;
}
