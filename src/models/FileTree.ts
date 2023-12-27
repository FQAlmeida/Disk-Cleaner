import type { Disk } from "./Disk";

export type GenericDesc = {
    nome: string,
    size: number,
    creation_date: Date,
    modification_date: Date,
};


export type ElementDesc = FileDesc | FolderDesc;
export type FileDesc = {} & GenericDesc;
export type FolderDesc = { children: ElementDesc[]; } & GenericDesc;

export type FileTree = {
    disk: Disk,
    root: ElementDesc[];
};