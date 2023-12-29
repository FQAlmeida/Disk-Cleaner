<script lang="ts">
    import {
        RecursiveTreeView,
        type TreeViewNode,
    } from "@skeletonlabs/skeleton";
    export let node: TreeViewNode[];
</script>

<RecursiveTreeView selection multiple relational padding="py-1 px-1" indent="ml-2" nodes={node} />
