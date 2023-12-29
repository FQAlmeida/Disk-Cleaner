<script lang="ts">
  import Configs from "./sections/Configs.svelte";
  import Header from "./sections/Header.svelte";
  import FileTree from "./sections/FileTree.svelte";
  import Footer from "./sections/Footer.svelte";
  import { available_file_trees } from "./store/file_tree";
</script>

<Header />
<main class="container mx-auto">
  <!-- <nav>Navigation</nav> -->
  <Configs />
  <FileTree data={$available_file_trees}/>
  <section>Data Analyses</section>
</main>
<Footer />
