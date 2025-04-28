import { PUBLIC_API_KEY } from '$env/static/public';
export async function load({ fetch, params }) {
    try {
        const resp = await fetch(
            `https://api.themoviedb.org/3/search/movie?api_key=${PUBLIC_API_KEY}&language=hu-HU&query=${params.title}&page=1&include_adult=false`
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
