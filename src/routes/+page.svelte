<script lang="ts">
    import PopularMovies from '../components/PopularMovies.svelte';
    import SearchMovies from '../components/SearchMovies.svelte';

    export let data: { popular: Array<{
            id: number,
            title: string,
            poster_path: string,
            vote_average: number,
            release_date: string }> };

    console.log('Page received data:', data);
    const popular = data.popular;
    console.log('Popular extracted:', popular);
</script>

<section>
    <SearchMovies/>
    <PopularMovies {popular}/>
</section>
