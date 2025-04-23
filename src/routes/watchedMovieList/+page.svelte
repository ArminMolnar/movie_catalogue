<script lang="ts">
    import {onMount} from 'svelte';
    import {watchedMovies} from '$lib/stores/movieStore';
    import MovieGrid from '../../components/MovieGrid.svelte';
    import type {Movie} from '$lib/types';
    import {goto} from "$app/navigation";
    import {fetchMovie} from '$lib/api';

    let watchedMoviesList: Movie[] = [];
    let loading = true;
    let error: string | null = null;


    $: watchedIds = $watchedMovies;


    $: {
        if (watchedIds) {
            fetchWatchedMovies(watchedIds);
        }
    }

    async function fetchWatchedMovies(ids: number[]) {
        if (ids.length === 0) {
            watchedMoviesList = [];
            loading = false;
            return;
        }

        loading = true;
        try {
            const promises = ids.map(id =>
                fetchMovie(id)
            );
            watchedMoviesList = await Promise.all(promises);
            error = null;
        } catch (err) {
            console.error('Error fetching list of watched movies:', err);
            error = 'Failed to load your list of watched movies. Please try again later.';
        } finally {
            loading = false;
        }
    }

    onMount(() => {
        fetchWatchedMovies($watchedMovies);
    });

    function goToHomePage() {
        goto('/');
    }
</script>

<div class="watched-container">
    <h1>Megnézett filmek</h1>

    {#if loading}
        <div class="loading">Loading your watched movies list...</div>
    {:else if error}
        <div class="error">{error}</div>
    {:else if watchedMoviesList.length === 0}
        <div class="empty-list">
            <p>A megnézett filmek listája üres.</p>
            <p>Adj hozzá filmeket a "Láttam" gombra kattintva a főoldalon.</p>
            <button on:click={goToHomePage} class="main-page">← Főoldal</button>
        </div>
    {:else}
        <MovieGrid movies={watchedMoviesList} inWatchedView={true}/>
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

<title>Megnézett filmek</title>

