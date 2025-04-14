<script lang="ts">
    import SearchMovies from '../../components/SearchMovies.svelte';
    import MovieGrid from "../../components/MovieGrid.svelte";
    import type {Movie} from "$lib/types";

    export let data: {
        best: Movie[]
    };

    const best = data.best;
</script>

<section>
    <SearchMovies/>
    <MovieGrid movies={best} title="Legjobbra értékelt filmek"/>
</section>