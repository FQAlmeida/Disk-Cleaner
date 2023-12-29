<script lang="ts">
    import type { TreeViewNode } from "@skeletonlabs/skeleton";
    import FileTreeView from "../components/file_tree_view/FileTreeView.svelte";
    import type {
        FileTree,
        FileTreeContent,
        FolderDesc,
        ElementDesc,
    } from "../models/FileTree";
    export let data: FileTree[];
    const isFolder = (x: ElementDesc): x is FolderDesc =>
        "children" in Object.keys(x);
    const map_children = (children: FileTreeContent): TreeViewNode[] => {
        return Object.keys(children).map((name) => {
            const child = children[name];
            if (isFolder(child)) {
                return {
                    id: name,
                    content: name,
                    children: map_children(child.children),
                } as TreeViewNode;
            }
            return {
                id: name,
                content: name,
            } as TreeViewNode;
        }) as TreeViewNode[];
    };
    $: node: TreeViewNode[] = data.map((file_tree) => {
        return {
            id: file_tree.disk.name,
            content: file_tree.disk.name,
            children: map_children(file_tree.children),
        } as TreeViewNode;
    });
</script>

<FileTreeView {node} />
{#each data as d}
    {Object.keys(d.children)}
{/each}
