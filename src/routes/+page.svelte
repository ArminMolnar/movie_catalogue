<script lang="ts">
    import SearchMovies from '../components/SearchMovies.svelte';
    import MovieGrid from "../components/MovieGrid.svelte";
    import type { Movie } from '$lib/types';

    export let data: { popular: Movie[] };

    const popular = data.popular;
</script>

<title>Népszerű filmek</title>

<section>
    <SearchMovies/>
    <MovieGrid movies={popular} title="Népszerű filmek" />
</section>