import type { Disk } from "./Disk";

export type GenericDesc = {
    size: number,
    creation_date: Date,
    modification_date: Date,
};


export type ElementDesc = FileDesc | FolderDesc;
export type FileDesc = {} & GenericDesc;
export type FolderDesc = { children: FileTreeContent; } & GenericDesc;

export type FileTreeContent = {
    [Key: string]: ElementDesc;
};

export type FileTree = {
    disk: Disk,
    children: FileTreeContent;
};