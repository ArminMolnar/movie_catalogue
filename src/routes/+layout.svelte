<script lang="ts">
    import { onMount } from 'svelte';
    import { initializeStores } from '$lib/stores/movieStore';
    import Notifications from "../components/Notifications.svelte";

    onMount(() => {
        initializeStores();
    });
</script>

<Notifications/>

<div class="container">
    <nav class="navbar">
        <ul>
            <li><a href="/">Főoldal</a></li>
            <li><a href="/movies/bestMovieList">Legjobbra értékelt filmek</a></li>
            <li><a href="/movies/watchedMovieList">Megtekintett filmek</a></li>
            <li><a href="/movies/watchList">Megnézendő filmek</a></li>
        </ul>
    </nav>
    <slot />
</div>

<style>
    :global(body) {
        background-color: rgba(11, 57, 72, 0.8);
        margin: 0;
        padding: 0;
        font-family: system-ui, -apple-system, sans-serif;
    }

    .container {
        width: 85%;
        max-width: 1300px;
        margin: 1rem auto;
        background-color: rgba(217, 219, 241, 0.56);
        border-radius: 16px;
        padding-bottom: 2rem;
        overflow: visible;
        box-shadow: 0 8px 30px rgba(11, 57, 72, 0.3);
    }

    .navbar {
        width: 90%;
        margin: 0 auto;
        background-color: #416165;
        border-radius: 0 0 12px 12px;
        overflow: hidden;
        box-shadow: 0 4px 12px rgba(11, 57, 72, 0.2);
    }

    .navbar ul {
        list-style-type: none;
        margin: 0;
        padding: 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .navbar ul li {
        flex: 1;
        position: relative;
        font-weight: 600;
        transition: background-color 0.3s ease;
    }

    .navbar ul li:not(:last-child)::after {
        content: '';
        position: absolute;
        right: 0;
        top: 25%;
        height: 50%;
        width: 1px;
        background-color: #ACB0BD;
    }

    .navbar ul li a {
        display: block;
        color: #D9DBF1;
        padding: 16px 20px;
        text-decoration: none;
        text-align: center;
        transition: all 0.3s ease;
    }

    .navbar ul li a:hover {
        background-color: #0B3948;
        color: #D9DBF1;
        transform: translateY(-2px);
    }

    @media (max-width: 768px) {
        .container {
            width: 95%;
            margin: 1rem auto;
        }

        .navbar {
            width: 100%;
            border-radius: 0;
        }

        .navbar ul {
            flex-direction: column;
        }

        .navbar ul li:not(:last-child)::after {
            display: none;
        }

        .navbar ul li a {
            padding: 12px;
        }
    }
</style>
