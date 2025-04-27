import {fetchMovies} from "$lib/api/movie";

export async function load() {
    try {
        const data = await fetchMovies('/popular', 2);

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
