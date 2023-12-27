<script>
    import { Hr, Spinner } from "flowbite-svelte";
    import DiskTable from "../components/disk_table/DiskTable.svelte";
    import { available_disks } from "../store/available_disks";
    import RuleList from "../components/rule_list/RuleList.svelte";
    let paths_to_delete = ["node_modules", "target", "build", "dist"];
    let paths_to_ignore = ["movies", "images"];
</script>

<section>
    {#await $available_disks}
        <Spinner />
    {:then $available_disks}
        <DiskTable disks={$available_disks} />
    {/await}
    <Hr />
    <div class="grid grid-cols-1 space-y-0 sm:grid-cols-2 gap-6">
        <RuleList list_name={"Paths to Delete"} bind:paths={paths_to_delete} />
        <RuleList list_name={"Paths to Ignore"} bind:paths={paths_to_ignore} />
    </div>
    <Hr />
</section>
