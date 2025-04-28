import {fetchMovies} from '$lib/api/movie';

export async function load() {
    try {
        const bestMovies = await fetchMovies('/top_rated', 2);

        return {
            best: bestMovies
        };
    } catch (error) {
        console.error('Error in load function:', error);
        return {
            best: []
        };
    }
}
