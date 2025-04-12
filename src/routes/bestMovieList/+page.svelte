<script lang="ts">
    import SearchMovies from '../../components/SearchMovies.svelte';
    import MovieGrid from "../../components/MovieGrid.svelte";

    export let data: { best: Array<{
            id: number,
            title: string,
            poster_path: string,
            vote_average: number,
            release_date: string }> };

    console.log('Page received data:', data);
    const best = data.best;
    console.log('Popular extracted:', best);
</script>

<section>
    <SearchMovies/>
    <MovieGrid movies={best} title="Legjobbra értékelt filmek" />
</section>