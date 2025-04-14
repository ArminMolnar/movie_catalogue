<script lang="ts">
    import MovieCard from "../../../components/MovieCard.svelte";
    import SearchMovies from '../../../components/SearchMovies.svelte';

    export let data;
    $: searchedMovie = data.searchedMovie;
</script>

    <SearchMovies/>
<div class="searched-movies">
    {#each searchedMovie as movie}
        <MovieCard {movie}/>
    {/each}
</div>

<style>
    .searched-movies {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
        gap: 1rem;
        margin-top: 2rem;
    }
</style>

