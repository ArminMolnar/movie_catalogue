<script lang="ts">
    import MovieCard from "../../../components/MovieCard.svelte";
    import SearchMovies from '../../../components/SearchMovies.svelte';
    import SectionTitle from "../../../components/SectionTitle.svelte";

    export let data;
    $: searchedMovie = data.searchedMovie;
</script>

<SectionTitle title={"Találatok:"}></SectionTitle>
    <SearchMovies/>
<div class="searched-movies">
    {#each searchedMovie as movie}
        <MovieCard {movie}/>
    {/each}
</div>

<style>
    .searched-movies {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
        gap: 1rem;
        margin-top: 2rem;
    }
</style>

