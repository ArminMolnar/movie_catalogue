export async function load({ fetch, params }) {
    const API_KEY = '2403c84e57275967c9aee3f1f464845f';
    const resp = await fetch(`https://api.themoviedb.org/3/movie/${params.id}?api_key=${API_KEY}&language=hu-HU`);

    const data = await resp.json();


    if (resp.ok) {
        return {
            movieDetails: data
        };
    }
}

