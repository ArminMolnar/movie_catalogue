<script lang="ts">
    import SearchMovies from '../../components/SearchMovies.svelte';
    import MovieGrid from "../../components/MovieGrid.svelte";
    import SectionTitle from "../../components/SectionTitle.svelte";
    import type {Movie} from "$lib/types/movie";

    export let data: {
        best: Movie[]
    };

    const best = data.best;
</script>

<title>Legjobbra értékelt filmek</title>

<section>
    <SectionTitle title={"Legjobbra értékelt filmek"}></SectionTitle>
    <SearchMovies/>
    <MovieGrid movies={best}/>
</section>