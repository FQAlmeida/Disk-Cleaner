import { IpcMainEvent } from "electron";
import { IpcChannelInterface, IpcRequest } from "../types/IpcChannelInterface";
import { readFile, writeFile } from "fs";
import { ExpressionsStructure } from "../../types/ExpressionStructure";
import {expressions_channels} from "../ipc_channels.type";

export class ExpressionsRetrieveChannel implements IpcChannelInterface {
    getName(): expressions_channels {
        return "expressions-retrieve";
    }

    handle(event: IpcMainEvent, request: IpcRequest): void {
        const response_channel: string = request.response_channel ?? `${this.getName()}-response`;

        readFile("./src/config/expressions.json", (err, data) => {
            if (err) {
                console.error(err);
                return;
            }
            const expressions: ExpressionsStructure = JSON.parse(data.toString());
            event.sender.send(response_channel, expressions);
        });
    }
}

export class ExpressionsSaveChannel implements IpcChannelInterface<ExpressionsStructure>{
    getName(): expressions_channels {
        return "expressions-save";
    }

    handle(event: IpcMainEvent, request: IpcRequest<ExpressionsStructure>): void {
        const response_channel: string = request.response_channel ?? `${this.getName()}-response`;
        console.log(request.params);
        
        writeFile("./src/config/expressions.json", JSON.stringify(request.params, null, "\t"), () => {
            event.sender.send(response_channel);
        });
    }
}
