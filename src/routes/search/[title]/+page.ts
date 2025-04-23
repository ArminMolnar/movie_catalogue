export async function load({fetch, params}) {
    const API_KEY = '2403c84e57275967c9aee3f1f464845f';
    const resp = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=hu-HU&query=${params.title}&page=1&include_adult=false`);

    const data = await resp.json();

    if (!params.title || params.title.trim().length < 2) {
        return { searchedMovie: [] };
    }

    if (resp.ok) {
        return {
            searchedMovie: data.results
        }
    }
}


