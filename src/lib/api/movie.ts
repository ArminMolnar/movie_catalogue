const API_KEY = '2403c84e57275967c9aee3f1f464845f';
const BASE_URL = 'https://api.themoviedb.org/3/movie';
const LANGUAGE='hu-HU';

export async function fetchMovies(endpoint: string, totalPages: number = 1) {
    let allData: any[] = [];

    try {
        for (let page = 1; page <= totalPages; page++) {
            const url = `${BASE_URL}${endpoint}?api_key=${API_KEY}&language=${LANGUAGE}&page=${page}`;
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(`Failed to fetch movies: ${response.statusText}`);
            }

            const data = await response.json();
            allData = [...allData, ...data.results];
        }

        return allData;
    } catch (error) {
        console.error(`Error fetching movies from ${endpoint}:`, error);
        throw error;
    }
}

export async function fetchMovie(movieId: number | string) {
    try {
        const url = `${BASE_URL}/${movieId}?api_key=${API_KEY}&language=${LANGUAGE}`;
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Failed to fetch movie: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error(`Error fetching movie with ID ${movieId}:`, error);
        throw error;
    }
}

export async function fetchMovieCredits(movieId: number) {
    try {
        const url = `${BASE_URL}/${movieId}/credits?api_key=${API_KEY}&language=${LANGUAGE}`;
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Failed to fetch movie: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error(`Error fetching movie with ID ${movieId}:`, error);
        throw error;
    }
}