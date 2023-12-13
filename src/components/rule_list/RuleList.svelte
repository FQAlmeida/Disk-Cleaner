<script lang="ts">
    import { Listgroup } from "flowbite-svelte";
    import { FolderSolid } from "flowbite-svelte-icons";
    export let list_name: string;
    export let paths: string[];
    let paths_data = paths.map((path) => {
        return { name: path, icon: FolderSolid };
    });
</script>

<div>
    <p class="text-lg font-semibold dark:text-white">{list_name}</p>
    <Listgroup
        active
        items={paths_data}
        let:item
        class="h-60 overflow-auto divide-y divide-gray-100 rounded-lg shadow"
        on:click={console.log}
    >
        <svelte:component this={item.icon} class="w-3 h-3 me-2.5" />
        {item.name}
    </Listgroup>
</div>
