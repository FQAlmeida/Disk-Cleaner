import { IpcMainEvent } from "electron";
import { IpcChannelInterface, IpcRequest } from "../../types/IpcChannelInterface";
import { readFile } from "fs";
import { ExpressionsConfigFile } from "../../types/ExpressionConfigFile";
import { writeFile } from "original-fs";

export class ExpressionsRetrieveChannel implements IpcChannelInterface {
    getName(): string {
        return "expressions-retrieve";
    }

    handle(event: IpcMainEvent, request: IpcRequest): void {
        const response_channel: string = request.response_channel ?? `${this.getName()}-response`;

        readFile("./src/config/expressions.json", (err, data) => {
            if (err) {
                console.error(err);
                return;
            }
            const expressions: ExpressionsConfigFile = JSON.parse(data.toString());
            event.sender.send(response_channel, expressions);
        });
    }
}

export class ExpressionsSaveChannel implements IpcChannelInterface<ExpressionsConfigFile>{
    getName(): string {
        return "expressions-save";
    }

    handle(event: IpcMainEvent, request: IpcRequest<ExpressionsConfigFile>): void {
        const response_channel: string = request.response_channel ?? `${this.getName()}-response`;

        writeFile("./src/config/expressions.json", JSON.stringify(request.params, null, "\t"), () => {
            event.sender.send(response_channel);
        });
    }
}
