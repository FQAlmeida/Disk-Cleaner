<script lang="ts">
    import {
        Navbar,
        NavBrand,
        NavHamburger,
    } from "flowbite-svelte";
</script>

<header>
    <Navbar fluid>
        <NavBrand
            href="https://github.com/FQAlmeida/Disk-Cleaner"
            target="blank"
        >
            <img
                src="/tauri.svg"
                class="me-3 h-6 sm:h-9"
                alt="Disk Cleaner Logo"
            />
            <span
                class="self-center whitespace-nowrap text-xl font-semibold dark:text-white"
                >Disk Cleaner</span
            >
        </NavBrand>
        <NavHamburger />
        <!-- <NavUl>
            <NavLi href="/">Home</NavLi>
            <NavLi href="/about">About</NavLi>
            <NavLi href="/docs/components/navbar">Navbar</NavLi>
            <NavLi href="/pricing">Pricing</NavLi>
            <NavLi href="/contact">Contact</NavLi>
        </NavUl> -->
    </Navbar>
</header>
