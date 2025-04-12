<script lang="ts">
    import MovieCard from "../../../components/MovieCard.svelte";

    export let data;
    const {searchedMovie} = data;
    console.log('searchedMovie:', searchedMovie);
</script>

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
