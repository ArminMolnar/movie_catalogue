import type {PageLoad} from './$types';

export const load: PageLoad = async ({fetch}) => {
    const API_KEY = '2403c84e57275967c9aee3f1f464845f';
    const BASE_URL = 'https://api.themoviedb.org/3';

    const totalPages = 2;
    let allMovies: any[] = [];

    try {
        for (let page = 1; page <= totalPages; page++) {
            const response = await fetch(
                `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=hu-HU&page=${page}`
            );

            if (!response.ok) {
                throw new Error(`Failed to fetch popular movies: ${response.statusText}`);
            }

            const data = await response.json();

            console.log(`Fetched data from page ${page}:`, data);

            allMovies = [...allMovies, ...data.results];
        }

        return {
            popular: allMovies
        };
    } catch (error) {
        console.error('Error fetching popular movies:', error);
        throw error;
    }
};