<script lang="ts">
    import type {Movie} from "$lib/types";
    import OptionsButton from "./OptionsButton.svelte";
    import {
        addToWatchlist,
        removeFromWatchlist,
        markAsWatched,
        isInWatchlist,
        isWatched,
        removeFromWatched
    } from '$lib/stores/movieStore';

    export let movie: Movie;
    export let inWatchlistView = false;
    export let inWatchedView = false;

    $: isInWatchlistStore = isInWatchlist(movie.id);
    $: isInWatchedStore = isWatched(movie.id);

    $: menuItems = inWatchlistView
        ? [
            {
                name: 'markAsWatched',
                onClick: () => markAsWatched(movie),
                displayText: "Láttam",
                class: 'fa-solid fa-eye'
            },
            { name: 'hr' },
            {
                name: 'removeFromWatchlist',
                onClick: () => removeFromWatchlist(movie.id),
                displayText: "Eltávolítás a listáról",
                class: 'fa-solid fa-trash'
            }
        ]
        : inWatchedView
            ? [
                {
                    name: 'removeFromWatched',
                    onClick: () => removeFromWatched(movie.id),
                    displayText: "Eltávolítás a listáról",
                    class: 'fa-solid fa-trash-can'
                },
                {name:'hr'},
                {
                    name: 'rateMovie',
                    displayText: "Film értékelése",
                    class: 'fa-solid fa-star'
                }
            ]
            : [
                {
                    name: 'markAsWatched',
                    onClick: () => markAsWatched(movie),
                    displayText: isInWatchedStore ? "Már láttam" : "Láttam",
                    class: isInWatchedStore ? 'fa-solid fa-check' : 'fa-solid fa-eye',
                    disabled: isInWatchedStore
                },
                { name: 'hr' },
                {
                    name: 'addToWatchlist',
                    onClick: () => addToWatchlist(movie),
                    displayText: isInWatchedStore ? "Megnézném újra" : "Megnézném",
                    class: 'fa-solid fa-bookmark',
                    disabled: isInWatchlistStore
                }
            ];
</script>

<div class="movie-card-container">
    <OptionsButton
            menuId={`menu-${movie.id}`}
            menuItems={menuItems}
    />

    <a href={`/movieDetails/${movie.id}`} class="movie-card">
        <div class="poster-container">
            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title}/>
        </div>
        <div class="movie-info">
            <h2>
                {movie.title}
            </h2>
            <p> <span style="color:gold; font-size: 1rem;">★</span>
                {movie.vote_average.toFixed(1)}</p>
            <p>{movie.release_date}</p>

        </div>
    </a>
</div>


<style>
    .movie-card {
        display: flex;
        flex-direction: column;
        width: 100%;
        text-decoration: none;
        color: inherit;
        padding: 1rem;
        box-sizing: border-box;
    }

    .poster-container {
        position: relative;
        width: 100%;
    }

    .movie-card-container {
        position: relative;
    }

    img {
        width: 100%;
        height: 40vh;
        object-fit: cover;
        border-radius: 1rem;
        display: block;
    }

    .movie-info {
        text-align: center;
        padding-top: 0.5rem;
        padding-bottom: 0;
        font-weight: bold;
    }

    p {
        font-size: 0.95rem;
        font-family: system-ui, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
        margin-top: 0;
        margin-bottom: 0;
    }

    h2 {
        font-size: 1.15rem;
        font-family: system-ui, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
        margin-bottom: 0.1rem;
        margin-top: 0;
    }
</style>

