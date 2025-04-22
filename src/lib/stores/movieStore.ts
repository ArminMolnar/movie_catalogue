import { writable, get } from 'svelte/store';
import { browser } from '$app/environment';


const storedWatchlist = browser ?
    JSON.parse(localStorage.getItem('watchlist') || '[]') :
    [];

const storedWatchedMovies = browser ?
    JSON.parse(localStorage.getItem('watchedMovies') || '[]') :
    [];


export const watchlist = writable<number[]>(storedWatchlist);
export const watchedMovies = writable<number[]>(storedWatchedMovies);


if (browser) {
    watchlist.subscribe(value => {
        localStorage.setItem('watchlist', JSON.stringify(value));
    });

    watchedMovies.subscribe(value => {
        localStorage.setItem('watchedMovies', JSON.stringify(value));
    });
}


export function addToWatchlist(movieId: number) {
    watchlist.update(list => {
        if (!list.includes(movieId)) {
            return [...list, movieId];
        }
        return list;
    });
}

export function removeFromWatchlist(movieId: number) {
    watchlist.update(list => list.filter(id => id !== movieId));
}

export function isInWatchlist(movieId: number): boolean {
    return get(watchlist).includes(movieId);
}


export function markAsWatched(movieId: number) {
    watchedMovies.update(list => {
        if (!list.includes(movieId)) {
            return [...list, movieId];
        }
        return list;
    });

    removeFromWatchlist(movieId);
}

export function removeFromWatched(movieId: number) {
    watchedMovies.update(list => list.filter(id => id !== movieId));
}

export function isWatched(movieId: number): boolean {
    return get(watchedMovies).includes(movieId);
}
