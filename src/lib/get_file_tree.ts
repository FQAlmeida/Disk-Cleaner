import { emit, listen } from "@tauri-apps/api/event";
import type { Disk } from "../models/Disk";

export async function emit_file_tree_loader(disk: Disk): Promise<void> {
    await emit('load_file_tree', disk);
}

const unlisten = await listen('load_file_tree_result', (event) => {
    console.log(event);
});
