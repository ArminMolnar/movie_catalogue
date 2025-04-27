<script lang="ts">
    import SearchMovies from '../components/SearchMovies.svelte';
    import MovieGrid from "../components/MovieGrid.svelte";
    import SectionTitle from "../components/SectionTitle.svelte";
    import type { Movie } from '$lib/types/movie';

    export let data: { popular: Movie[] };
    const popular = data.popular;
</script>

<title>Főoldal</title>

<section>
    <SectionTitle title={"Most népszerű filmek"}></SectionTitle>
    <SearchMovies/>
    <MovieGrid movies={popular}/>
</section>

