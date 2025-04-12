import type {PageLoad} from './$types';
import {fetchMovieData} from "$lib/api";

export const load: PageLoad = async () => {
    try {
        const data = await fetchMovieData('/movie/popular', 2);

        return {
            popular: data
        };
    } catch (error) {
        console.error('Error in load function:', error);

    }
};