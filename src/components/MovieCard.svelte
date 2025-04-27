<script lang="ts">
    import type {Movie} from "$lib/types/movie";
    import OptionsButton from "./OptionsButton.svelte";
    import {
        addToWatchlist,
        removeFromWatchlist,
        markAsWatched,
        removeFromWatched,
        watchlist,
        watchedMovies,
    } from '$lib/stores/movieStore';
    import {saveRating, fetchRating} from "$lib/api/rating";
    import {notifications} from "$lib/stores/notificationStore";
    import RatingWindow from "./RatingWindow.svelte";
    import StarRating from "./StarRating.svelte";
    import {onMount} from "svelte";


    export let movie: Movie;
    export let inWatchlistView = false;
    export let inWatchedView = false;

    $: isInWatchlistStore = $watchlist.includes(movie.id);
    $: isInWatchedStore = $watchedMovies.includes(movie.id);

    $: menuItems = createMenuItems(inWatchlistView, inWatchedView, isInWatchlistStore, isInWatchedStore);

    let showRatingModal = false;
    let userRating = 0;
    let savedRating: number | null = null;


    onMount(async () => {
        const rating = await fetchRating(movie.id);
        if (typeof rating === 'number') {
            savedRating = rating;
            userRating = rating;
        }
    });

    async function handleSaveRating(newRating: number) {
        userRating = newRating;
        const success = await saveRating(movie.id, newRating);
        if (success) {
            savedRating = newRating;
            notifications.success('Értékelés elmentve!');
        } else {
            notifications.warning('Nem sikerült elmenteni az értékelést.');
        }
        showRatingModal = false;
    }

    function createMenuItems(
        inWatchlistView: boolean,
        inWatchedView: boolean,
        isInWatchlistStore: boolean,
        isInWatchedStore: boolean
    ) {
        return inWatchlistView
            ? [
                {
                    name: 'markAsWatched',
                    onClick: async () => {
                        await markAsWatched(movie);
                        notifications.success(`A film hozzáadva a megtekintett filmekhez.`);
                    },
                    displayText: "Megnéztem",
                    class: 'fa-solid fa-eye'
                },
                {name: 'hr'},
                {
                    name: 'removeFromWatchlist',
                    onClick: async () => {
                        await removeFromWatchlist(movie.id);
                        notifications.success(`A film eltávolítva a listáról.`);

                    },
                    displayText: "Eltávolítás a listáról",
                    class: 'fa-solid fa-trash'
                }
            ]
            : inWatchedView
                ? [
                    {
                        name: 'rateMovie',
                        onClick: () => {
                            showRatingModal = true;
                        },
                        displayText: "Film értékelése",
                        class: 'fa-solid fa-star'
                    },
                    {name: 'hr'},
                    {
                        name: 'removeFromWatched',
                        onClick: async () => {
                            await removeFromWatched(movie.id);
                            notifications.success(`A film eltávolítva a listáról.`);
                        },
                        displayText: "Eltávolítás a listáról",
                        class: 'fa-solid fa-trash-can'
                    }
                ]
                : [
                    {
                        name: 'markAsWatched',
                        onClick: async () => {
                            if (!isInWatchedStore) {
                                await markAsWatched(movie);
                                notifications.success(`A film hozzáadva a megtekintett filmekhez.`);
                            } else {
                                notifications.warning('A film már szerepel a listán.')
                            }
                        },
                        displayText: isInWatchedStore ? "Már megnéztem" : "Megnéztem",
                        class: isInWatchedStore ? 'fa-solid fa-check' : 'fa-solid fa-eye',
                        disabled: isInWatchedStore
                    },
                    {name: 'hr'},
                    {
                        name: 'addToWatchlist',
                        onClick: async () => {
                            if (!isInWatchlistStore) {
                                await addToWatchlist(movie);
                                notifications.success(`A film hozzáadva a megnézendő filmekhez.`);
                            } else {
                                notifications.warning("A film már szerepel a listán");
                            }
                        },
                        displayText: isInWatchedStore ? "Megnézném újra" : "Megnézném",
                        class: 'fa-solid fa-bookmark',
                        disabled: isInWatchlistStore
                    }
                ];
    }
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
    </a>
    <div class="movie-info">
        <h2>
            {movie.title}
        </h2>
        <p><span style="color:gold; font-size: 1.1rem;">★</span>
            {movie.vote_average.toFixed(1)}</p>
        <p>{movie.release_date}</p>
    </div>

    <div class="rating">
        {#if inWatchedView && savedRating !== null}
            <p>Saját értékelés: <span style="color:gold; font-size: 1.1rem;">★</span>
                {savedRating}</p>
        {/if}
    </div>
    <RatingWindow open={showRatingModal} close={() => showRatingModal = false}>
        <h2>Értékeld a filmet!</h2>
        <StarRating bind:rating={userRating}/>
        <div class="save-button">
            <button on:click={() => handleSaveRating(userRating)}>Mentés</button>
        </div>
    </RatingWindow>
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

    .movie-card-container {
        position: relative;
    }

    .poster-container img {
        width: 100%;
        height: 45vh;
        object-fit: cover;
        border-radius: 1rem;
        transition: transform 0.3s ease-out, box-shadow 0.3s ease;
    }

    .poster-container img:hover {
        transform: scale(1.05);
        box-shadow: 0 8px 20px rgba(11, 57, 72, 0.3);
    }

    img {
        width: 100%;
        height: 40vh;
        object-fit: cover;
        border-radius: 1rem;
    }

    .movie-info {
        text-align: center;
    }

    h2 {
        font-size: 1.3rem;
        font-weight: 700;
        color: #020709;
        margin: 0 0 0.3rem 0;
        letter-spacing: -0.01em;
        line-height: 1.3;
    }

    p {
        font-size: 1rem;
        font-weight: 500;
        color: #070c0c;
        margin: 0 0 0.1rem 0;
    }

    .rating {
        text-align: center;
    }

    .save-button {
        display: flex;
        justify-content: center;
        gap: 1rem;
        margin-top: 1rem;
    }

    button {
        padding: 0.5rem 1rem;
        font-size: 1rem;
        background-color: #f0f0f0;
        border: 1px solid #ccc;
        border-radius: 0.5rem;
        cursor: pointer;
        color: black;
    }

    button:hover {
        background-color: #e0e0e0;
    }

</style>

