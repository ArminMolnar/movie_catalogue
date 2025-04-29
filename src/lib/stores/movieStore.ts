import {writable} from 'svelte/store';
import type {Movie} from "$lib/types/movie";

export const watchlist = writable<number[]>([]);
export const watchedMovies = writable<number[]>([]);

export async function loadWatchlist() {
    try {
        const response = await fetch('/api/watchlist');
        if (!response.ok) throw new Error('Failed to fetch watchlist');

        const data = await response.json();
        const movieIds = data.map((item: { movieId: any; }) => item.movieId);
        watchlist.set(movieIds);

        return data;
    } catch (error) {
        console.error('Error loading watchlist:', error);
        return [];
    }
}

export async function loadWatchedMovies() {
    try {
        const response = await fetch('/api/watchedMovieList');
        if (!response.ok) throw new Error('Failed to fetch watched movies');

        const data = await response.json();
        const movieIds = data.map((item: { movieId: number }) => item.movieId);
        watchedMovies.set(movieIds);

        return data;
    } catch (error) {
        console.error('Error loading watched movies:', error);
        return [];
    }
}


export async function addToWatchlist(movie: Movie) {
    try {
        const response = await fetch('/api/watchlist', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(movie)
        });

        const result = await response.json();

        if (result.success) {
            watchlist.update(ids => {
                if (!ids.includes(movie.id)) {
                    return [...ids, movie.id];
                }
                return ids;
            });
            await loadWatchlist();
        }

        return result;
    } catch (error) {
        console.error('Error adding to watchlist:', error);
        return {success: false, message: 'Failed to add movie to watchlist'};
    }
}

export async function removeFromWatchlist(movieId: number) {
    try {
        const response = await fetch(`/api/watchlist/${movieId}`, {
            method: 'DELETE'
        });

        const result = await response.json();

        if (result.success) {
            watchlist.update(list => list.filter(id => id !== movieId));
        }

        return result;
    } catch (error) {
        console.error('Error removing from watchlist:', error);
        return {success: false, message: 'Failed to remove movie from watchlist'};
    }
}

export async function markAsWatched(movie: any) {
    try {
        const response = await fetch('/api/watchedMovieList', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(movie)
        });

        const result = await response.json();

        if (result.success) {
            watchedMovies.update(ids => {
                if (!ids.includes(movie.id)) {
                    return [...ids, movie.id];
                }
                return ids;
            });
            await loadWatchedMovies();
            await removeFromWatchlist(movie.id);
        }

        return result;
    } catch (error) {
        console.error('Error marking as watched:', error);
        return {success: false, message: 'Failed to mark movie as watched'};
    }
}


export async function removeFromWatched(movieId: number) {
    try {
        const response = await fetch(`/api/watchedMovieList/${movieId}`, {
            method: 'DELETE'
        });

        const result = await response.json();

        if (result.success) {
            watchedMovies.update(list => list.filter(id => id !== movieId));
        }

        return result;

    } catch (error) {
        console.error('Error removing from watched list:', error);
        return {success: false, message: 'Failed to remove movie from watched list'};
    }
}

export async function initializeStores() {
    await Promise.all([
        loadWatchlist(),
        loadWatchedMovies()
    ]);
}