<script lang="ts">
    import {
        Table,
        TableBody,
        TableBodyCell,
        TableBodyRow,
        TableHead,
        TableHeadCell,
        Checkbox,
    } from "flowbite-svelte";
    import type { Disk } from "../../models/Disk";
    import PrettyBytes from "pretty-bytes";

    export let disks: Disk[];
</script>

<p class="text-xl font-semibold dark:text-white">Available Disks</p>
<Table hoverable={true}>
    <TableHead>
        <TableHeadCell class="!p-4">
            <Checkbox />
        </TableHeadCell>
        <TableHeadCell>Disk Name</TableHeadCell>
        <TableHeadCell>Disk Capacity</TableHeadCell>
        <TableHeadCell>Available Space</TableHeadCell>
    </TableHead>
    <TableBody tableBodyClass="divide-y">
        {#each disks as disk}
            <TableBodyRow>
                <TableBodyCell class="!p-4">
                    <Checkbox />
                </TableBodyCell>
                <TableBodyCell>{disk.name}</TableBodyCell>
                <TableBodyCell>{PrettyBytes(disk.capacity)}</TableBodyCell>
                <TableBodyCell
                    >{PrettyBytes(disk.available_space) ??
                        "Not Analyzed"}</TableBodyCell
                >
            </TableBodyRow>
        {/each}
    </TableBody>
</Table>
