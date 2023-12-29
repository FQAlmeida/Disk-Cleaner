import { emit } from "@tauri-apps/api/event";
import type { Disk } from "../models/Disk";


export async function emit_file_tree_loader(disk: Disk): Promise<void> {
    await emit('load_file_tree', disk);
}


