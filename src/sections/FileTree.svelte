<script lang="ts">
    import type { TreeViewNode } from "@skeletonlabs/skeleton";
    import {
        FileOutline,
        FolderOutline,
        DesktopPcOutline,
    } from "flowbite-svelte-icons";
    import FileTreeView from "../components/file_tree_view/FileTreeView.svelte";
    import type {
        FileTree,
        FileTreeContent,
        FolderDesc,
        ElementDesc,
    } from "../models/FileTree";
    export let data: FileTree[];
    const isFolder = (element_desc: ElementDesc): element_desc is FolderDesc =>
        Object.keys(element_desc).includes("children");
    const map_children = (children: FileTreeContent): TreeViewNode[] => {
        return Object.keys(children).map((name) => {
            const child = children[name];
            if (isFolder(child)) {
                return {
                    id: name,
                    content: name,
                    lead: FolderOutline,
                    children: map_children(child.children),
                } as TreeViewNode;
            }
            return {
                id: name,
                content: name,
                lead: FileOutline,
            } as TreeViewNode;
        }) as TreeViewNode[];
    };
    $: node = data.map((file_tree) => {
        return {
            id: file_tree.disk.name,
            content: file_tree.disk.name,
            lead: DesktopPcOutline,
            children: map_children(file_tree.children),
        } as TreeViewNode;
    });
</script>

<FileTreeView {node} />
