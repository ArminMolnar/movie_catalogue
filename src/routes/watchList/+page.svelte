<script lang="ts">
    import { onMount } from 'svelte';
    import { watchlist } from '$lib/stores/movieStore';
    import MovieGrid from '../../components/MovieGrid.svelte';
    import type { Movie } from '$lib/types';
    import {goto} from "$app/navigation";
    import {fetchMovie} from '$lib/api';

    let watchlistMovies: Movie[] = [];
    let loading = true;
    let error: string | null = null;


    $: watchlistIds = $watchlist;


    $: {
        if (watchlistIds) {
            fetchWatchlistMovies(watchlistIds);
        }
    }

    async function fetchWatchlistMovies(ids: number[]) {
        if (ids.length === 0) {
            watchlistMovies = [];
            loading = false;
            return;
        }

        loading = true;
        try {
            const promises = ids.map(id => fetchMovie(id));
            watchlistMovies = await Promise.all(promises);
            error = null;
        } catch (err) {
            console.error('Error fetching watchlist movies:', err);
            error = 'Failed to load your watchlist. Please try again later.';
        } finally {
            loading = false;
        }
    }

    onMount(() => {
        fetchWatchlistMovies($watchlist);
    });

    function goToHomePage() {
        goto('/');
    }
</script>

<div class="watchlist-container">
    <h1>Megnézendő filmek</h1>

    {#if loading}
        <div class="loading">Loading your watchlist...</div>
    {:else if error}
        <div class="error">{error}</div>
    {:else if watchlistMovies.length === 0}
        <div class="empty-list">
            <p>A megnézendő filmek listája üres.</p>
            <p>Adj hozzá filmeket a "Megnézném" gombra kattintva a főoldalon.</p>
            <button on:click={goToHomePage} class="main-page">← Főoldal</button>
        </div>
    {:else}
        <MovieGrid movies={watchlistMovies}  inWatchlistView={true} />
    {/if}
</div>

<style>
    h1 {
        margin-top: 20px;
        text-align: center;
    }

    .empty-list {
        text-align: center;
        font-family: system-ui, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    }

    .main-page {
        display: inline-block;
        margin-top: 2rem;
        text-decoration: none;
        border-radius: 5px;
        color: black;
        font-weight: bold;
        font-size: 1.6rem;
        font-family: system-ui, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    }

    .main-page:hover {
        text-decoration: underline;
    }
</style>

<title>Megnézendő filmek</title>

