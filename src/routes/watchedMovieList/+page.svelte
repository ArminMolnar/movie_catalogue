<script lang="ts">
    import {watchedMovies} from '$lib/stores/movieStore';
    import MovieGrid from '../../components/MovieGrid.svelte';
    import type {Movie} from '$lib/types/movie';
    import {fetchMovie} from '$lib/api/movie';
    import HomeButton from "../../components/HomeButton.svelte";
    import SectionTitle from "../../components/SectionTitle.svelte";

    let watchedMovieList: Movie[] = [];
    let error: string | null = null;

    $: {
        if ($watchedMovies.length === 0) {
            watchedMovieList = [];
        } else {
            fetchWatchedMovies($watchedMovies);
        }
    }

    async function fetchWatchedMovies(ids: number[]) {
        try {
            const promises = ids.map(id => fetchMovie(id));
            watchedMovieList = await Promise.all(promises);
            error = null;
        } catch (err) {
            console.error('Error fetching watched movies list movies:', err);
            error = 'Failed to load your watched movies list.';
        }
    }
</script>

<title>Megtekintett filmek</title>

<div class="watchedMovies-container">
    <SectionTitle title={"Megtekintett filmek"}></SectionTitle>

    {#if error}
        <div class="error">{error}</div>
    {:else if $watchedMovies.length === 0}
        <div class="empty-list">
            <p>A megtekintett filmek listája üres.</p>
            <p>Adj hozzá filmeket a főoldalon.</p>
            <HomeButton/>
        </div>
    {:else}
        <MovieGrid movies={watchedMovieList} inWatchedView={true} />
    {/if}
</div>

<style>
    .empty-list {
        text-align: center;
        font-weight: 600;
    }
</style>
