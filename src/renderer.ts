/**
 * This file will automatically be loaded by webpack and run in the "renderer" context.
 * To learn more about the differences between the "main" and the "renderer" context in
 * Electron, visit:
 *
 * https://electronjs.org/docs/tutorial/application-architecture#main-and-renderer-processes
 *
 * By default, Node.js integration in this file is disabled. When enabling Node.js integration
 * in a renderer process, please be aware of potential security implications. You can read
 * more about security risks here:
 *
 * https://electronjs.org/docs/tutorial/security
 *
 * To enable Node.js integration in this file, open up `main.js` and enable the `nodeIntegration`
 * flag:
 *
 * ```
 *  // Create the browser window.
 *  mainWindow = new BrowserWindow({
 *    width: 800,
 *    height: 600,
 *    webPreferences: {
 *      nodeIntegration: true
 *    }
 *  });
 * ```
 */

import AppRender from "./app/index";
// import { IpcRendererService } from "./ipc/ipc_renderer";
// import { ExpressionsStructure } from "./types/ExpressionStructure";

console.log("👋 This message is being logged by \"renderer.js\", included via webpack");

// async function run_ipc() {
//     const config_aux: ExpressionsStructure = {
//         finder: [
//             { id: 1, expression: "node_modules", state: true },
//             { id: 2, expression: "node_modules_!", state: true },
//             { id: 3, expression: "node_modules_2", state: false },
//             { id: 4, expression: "node_modules_3", state: false },
//             { id: 5, expression: "node_modules_4", state: true }
//         ],
//         exception: [
//             { id: 1, expression: "node_modules", state: true },
//             { id: 2, expression: "node_modules_!", state: true },
//             { id: 3, expression: "node_modules_2", state: false },
//             { id: 4, expression: "node_modules_3", state: false },
//             { id: 5, expression: "node_modules_4", state: true }
//         ]
//     };
//     const ipc = new IpcRendererService();
//     console.log("retrieving");
    
//     ipc.send<undefined, ExpressionsStructure>("expressions-retrieve").then(value => {
//         console.log(value);
//     });
//     console.log("saving");
    
//     ipc.send<ExpressionsStructure>("expressions-save", {params: config_aux});
// }
// run_ipc();
AppRender();
