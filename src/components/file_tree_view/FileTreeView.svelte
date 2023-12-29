<script lang="ts">
    import {
        RecursiveTreeView,
        type TreeViewNode,
    } from "@skeletonlabs/skeleton";
    export let node: TreeViewNode[] = [
        {
            id: "0",
            content: "item 1",
            lead: "icon",
            children: [
                {
                    id: "01",
                    content: "item 2",
                    lead: "icon",
                },
            ],
        },
    ];
</script>

<RecursiveTreeView selection multiple nodes={node}></RecursiveTreeView>
