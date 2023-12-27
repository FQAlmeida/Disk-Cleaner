import { readable } from "svelte/store";
import type { Disk } from "../models/Disk";
import { get_disk_info } from "../lib/get_disk_info";

export const disk_infos = await get_disk_info();
export const available_disks = readable<Disk[]>(disk_infos);
