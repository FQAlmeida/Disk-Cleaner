<script>
    import { Hr } from "flowbite-svelte";
    import DiskTable from "../components/disk_table/DiskTable.svelte";
    import { available_disks } from "../store/available_disks";
    import RuleList from "../components/rule_list/RuleList.svelte";
    const paths_to_delete = ["node_modules", "target", "build", "dist"];
    const paths_to_ignore = ["movies", "images"];
</script>

<section>
    <DiskTable disks={$available_disks} />
    <Hr />
    <div class="grid grid-cols-1 space-y-0 sm:grid-cols-2 gap-6">
        <RuleList list_name={"Paths to Delete"} paths={paths_to_delete} />
        <RuleList list_name={"Paths to Ignore"} paths={paths_to_ignore} />
    </div>
    <Hr />
</section>
