export async function load({ fetch, params }) {
    try {
        const API_KEY = '2403c84e57275967c9aee3f1f464845f';
        const resp = await fetch(
            `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=hu-HU&query=${params.title}&page=1&include_adult=false`
        );

        if (!params.title || params.title.trim().length < 2) {
            return { searchedMovie: [] };
        }

        const data = await resp.json();

        if (resp.ok) {
            return {
                searchedMovie: data.results
            }
        }
    } catch (error) {
        console.error('Error in load function:', error);
        return {
            searchedMovie: []
        };
    }
}
