import { writable } from "svelte/store";
import type { ElementDesc, FileDesc, FileTree, FileTreeContent, FolderDesc } from "../models/FileTree";
import { disk_infos } from "./available_disks";
import { emit_file_tree_loader } from "../lib/get_file_tree";
import { listen } from "@tauri-apps/api/event";

disk_infos.forEach(disk_info => {
    emit_file_tree_loader(disk_info);
});

export const available_file_trees = writable<FileTree[]>(
    disk_infos.map((disk_info) => {
        return {
            disk: disk_info,
            children: {}
        };
    })
);
type Payload = {
    mount_point: string;
    element_type: string;
    name: string;
    parent: string;
    size: number;
};
const build_new_tree = (children: FileTreeContent, target_path: string[], payload: Payload): FileTreeContent => {
    if (target_path.length > 0) {
        const name: string = target_path[0];
        const rest_target_path = target_path.slice(1);
        let new_data: FileTreeContent = {};
        new_data[name] = {
            ...children[name],
            children: build_new_tree(children[name].children, rest_target_path, payload)
        };

        return {
            ...children,
            ...new_data
        };
    }
    const target_name = payload.name;
    let info: ElementDesc = {
        creation_date: new Date(Date.now()),
        modification_date: new Date(Date.now()),
        size: payload.size
    } as FileDesc;
    if (payload.element_type === "Folder") {
        info = { ...info, children: {} } as FolderDesc;
    }
    let new_data: FileTreeContent = {};
    new_data[target_name] = info;
    return {
        ...children,
        ...new_data
    } as FileTreeContent;
};
const unlisten = await listen('load_file_tree_result', (event) => {
    let payload = event.payload as Payload;

    available_file_trees.update((value) => {
        let disk_index = value.findIndex((v) => v.disk.name == payload.mount_point);
        let disk_file_tree = value[disk_index].children;
        const target_pieces = payload.parent.replaceAll(payload.mount_point, "").split(/\\|\//);
        const target_path = target_pieces.slice(0, -1);
        console.log(disk_file_tree, target_path);

        value[disk_index].children = build_new_tree(disk_file_tree, target_path, payload);
        return value;
    });
});
