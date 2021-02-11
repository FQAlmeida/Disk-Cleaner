import { IpcRenderer } from "electron";
import { IpcRequest } from "./types/IpcChannelInterface";

export class IpcRendererService {
    private ipc_renderer?: IpcRenderer;
    private ensureIpcRenderer(): void {
        if (!this.ipc_renderer) {
            if (!window || !window.process || !window.require) {
                throw new Error("Unable to require renderer process");
            }
            this.ipc_renderer = window.require("electron").ipcRenderer;
        }
    }
    private getIpcRenderer(): IpcRenderer {
        this.ensureIpcRenderer();
        if (!this.ipc_renderer) throw new Error("Ipc Renderer not found");
        return this.ipc_renderer;
    }

    public send<RQ = unknown, RS = unknown>(channel: string, request: IpcRequest<RQ> = {}): Promise<RS> {
        const ipc_renderer = this.getIpcRenderer();
        const response_channel = request.response_channel ?? `${channel}-response-${new Date().getTime()}`;

        ipc_renderer.send(channel, request);

        // This method returns a promise which will be resolved when the response has arrived.
        return new Promise(resolve => {
            ipc_renderer.once(response_channel, (_, response) => resolve(response));
        });
    }
}
