<script lang="ts">
    export let movies: Array<{
        id: number;
        title: string;
        poster_path: string;
        vote_average: number;
        release_date: string;
    }> = [];
    export let title: string = "";

    import MovieCard from "./MovieCard.svelte";
    console.log(`${title} movies received:`, movies);
</script>

<h1>{title}</h1>

{#if movies && movies.length > 0}
    <div class="movies-grid">
        {#each movies as movie (movie.id)}
            <MovieCard {movie}/>
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