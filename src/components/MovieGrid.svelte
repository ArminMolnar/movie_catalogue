<script lang="ts">
    import type {Movie} from "$lib/types";
    import MovieCard from "./MovieCard.svelte";

    export let movies: Movie[];
    export let title: string = "";
    export let inWatchlistView = false;
    export let inWatchedView = false;

    // Removing duplicates based on ID
    $: uniqueMovies = movies ? [... new Map(movies.map(movie => [movie.id, movie])).values()] : [];

</script>

<h1>{title}</h1>

{#if uniqueMovies && uniqueMovies.length > 0}
    <div class="movies-grid">
        {#each uniqueMovies as movie (movie.id)}
            <MovieCard {movie} {inWatchlistView} {inWatchedView} />
        {/each}
    </div>
{:else}
    <p>No movies available.</p>
{/if}

<style>
    .movies-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
        grid-column-gap: 1rem;
        grid-row-gap: 1rem;
    }

    h1 {
        text-align: center;
        font-family: system-ui, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    }
</style>