<script lang="ts">
    import PopularMovies from '../components/PopularMovies.svelte';
    import SearchMovies from '../components/SearchMovies.svelte';

    export let data: { popular: Array<{ title: string }> };

    console.log('Page received data:', data);
    const popular = data.popular;
    console.log('Popular extracted:', popular);
</script>

<section>
    <SearchMovies/>
    <PopularMovies {popular}/>
</section>
