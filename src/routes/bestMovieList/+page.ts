import type {PageLoad} from './$types';
import {fetchMovieData} from '$lib/api';

export const load: PageLoad = async () => {
    try {
        const bestMovies = await fetchMovieData('/movie/top_rated', 2);

        return {
            best: bestMovies
        };
    } catch (error) {
        console.error('Error in load function:', error);

    }
};