const API_KEY = '2403c84e57275967c9aee3f1f464845f';
const BASE_URL = 'https://api.themoviedb.org/3';

export async function fetchMovieData(endpoint: string, totalPages: number = 1, language: string = 'hu-HU') {
    let allData: any[] = [];

    try {
        for (let page = 1; page <= totalPages; page++) {
            const url = `${BASE_URL}${endpoint}?api_key=${API_KEY}&language=${language}&page=${page}`;
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(`Failed to fetch data: ${response.statusText}`);
            }

            const data = await response.json();
            console.log(`Fetched data from ${endpoint}, page ${page}:`, data);

            allData = [...allData, ...data.results];
        }

        return allData;
    } catch (error) {
        console.error(`Error fetching data from ${endpoint}:`, error);
        throw error;
    }
}