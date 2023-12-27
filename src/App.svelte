<script lang="ts">
  import Configs from "./sections/Configs.svelte";
  import Header from "./sections/Header.svelte";
  import Footer from "./sections/Footer.svelte";
  import { available_file_trees } from "./store/file_tree";
</script>

<Header />
<main class="container mx-auto">
  <!-- <nav>Navigation</nav> -->
  <Configs />
  <section>Tree</section>
  <section>Data Analyses</section>
</main>
{#each $available_file_trees as ft}
  {ft}
{/each}
<Footer />
