import {fetchMovies} from '$lib/api';

export async function load() {
    try {
        const bestMovies = await fetchMovies('/movie/top_rated', 2);

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
