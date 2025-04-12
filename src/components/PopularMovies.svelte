<script lang="ts">
    export let popular: Array<{
        id: number;
        title: string;
        poster_path: string;
        vote_average: number;
        release_date: string;
    }> = [];
    import MovieCard from "./MovieCard.svelte";
    console.log('PopularMovies received:', popular);
</script>

<h1>Most népszerű</h1>

{#if popular && popular.length > 0}
    <div class="popular-movies">
        {#each popular as movie (movie.id)}
            <MovieCard {movie}/>
        {/each}
    </div>
{:else}
    <p>No movies available.</p>
{/if}

<style>
    .popular-movies {
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
