import { invoke } from "@tauri-apps/api/tauri";
import type { Disk } from "../models/Disk";

export async function get_disk_info(): Promise<Disk[]> {
    let info_disks: Disk[] = await invoke("get_disk_info", {});
    return info_disks;
}