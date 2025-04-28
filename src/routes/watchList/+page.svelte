<script lang="ts">
    import { watchlist } from '$lib/stores/movieStore';
    import MovieGrid from '../../components/MovieGrid.svelte';
    import type { Movie } from '$lib/types/movie';
    import {fetchMovie} from '$lib/api/movie';
    import HomeButton from "../../components/HomeButton.svelte";
    import SectionTitle from "../../components/SectionTitle.svelte";

    let watchlistMovies: Movie[] = [];
    let error: string | null = null;

    $: {
        if ($watchlist.length === 0) {
            watchlistMovies = [];
        } else {
            fetchWatchlistMovies($watchlist);
        }
    }

    async function fetchWatchlistMovies(ids: number[]) {
        try {
            const promises = ids.map(id => fetchMovie(id));
            watchlistMovies = await Promise.all(promises);
            error = null;
        } catch (err) {
            console.error('Error fetching watchlist movies:', err);
            error = 'Failed to load your watchlist. ';
        }
    }
</script>

<title>Megnézendő filmek</title>

<div class="watchlist-container">
   <SectionTitle title={"Megnézendő filmek"}></SectionTitle>

    {#if error}
        <div class="error">{error}</div>
    {:else if $watchlist.length === 0}
        <div class="empty-list">
            <p>A megnézendő filmek listája üres.</p>
            <p>Adj hozzá filmeket a főoldalon.</p>
            <HomeButton/>
        </div>
    {:else}
        <MovieGrid movies={watchlistMovies} inWatchlistView={true} />
    {/if}
</div>

<style>
    .empty-list, .error {
        text-align: center;
        font-weight: 600;
    }
</style>



