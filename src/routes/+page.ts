import {fetchMovies} from "$lib/api";

export async function load() {
    try {
        const data = await fetchMovies('/movie/popular', 2);

        return {
            popular: data
        };
    } catch (error) {
        console.error('Error in load function:', error);
        return {
            popular: []
        };
    }
}
