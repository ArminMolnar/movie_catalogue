export async function load({ fetch, params }) {
    const resp = await fetch(`https://api.themoviedb.org/3/movie/${params.id}?api_key=2403c84e57275967c9aee3f1f464845f&language=hu-HU`);

    const data = await resp.json();
    console.log(data);

    if (resp.ok) {
        return {
            movieDetails: data
        };
    }
}

