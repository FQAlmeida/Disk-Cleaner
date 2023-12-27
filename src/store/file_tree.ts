import { writable } from "svelte/store";
import type { FileTree } from "../models/FileTree";
import { disk_infos } from "./available_disks";
import { emit_file_tree_loader } from "../lib/get_file_tree";

disk_infos.forEach(disk_info => {
    emit_file_tree_loader(disk_info);
});

export const available_file_trees = writable<FileTree[]>(disk_infos.map((disk_info) => {
    return {
        disk: disk_info,
        root: []
    };
})
);