<script lang="ts">
  import Configs from "./sections/Configs.svelte";
  import Header from "./sections/Header.svelte";
  import Footer from "./sections/Footer.svelte";
</script>

<Header />
<main class="container mx-auto">
  <!-- <nav>Navigation</nav> -->
  <Configs />
  <section>Tree</section>
  <section>Data Analyses</section>
</main>
<Footer />
