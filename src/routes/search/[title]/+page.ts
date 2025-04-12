export async function load({fetch, params}){
        const resp = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=2403c84e57275967c9aee3f1f464845f&language=hu-HU&query=${params.title}&page=1&include_adult=false`);

        const data = await resp.json();
        console.log(data);

        if(resp.ok){
            return {
                searchedMovie: data.results
            }
        }
}


