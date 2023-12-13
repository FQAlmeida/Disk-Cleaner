import { readable } from "svelte/store";
import type { Disk } from "../models/Disk";
import { get_disk_info } from "../lib/get_disk_info";

export const available_disks = readable<Disk[]>([], (set, _) => {
    get_disk_info().then(disk_info => {
        set(disk_info);
    });
});
