<script lang="ts">
    import type {Movie} from "$lib/types";

    export let movie: Movie;
</script>

<a href={`/movieDetails/${movie.id}`} class="movie-card">
    <div class="poster-container">
        <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
        <div class="buttons-container">
            <button class="button add">+</button>
            <button class="button remove">-</button>
        </div>
    </div>
    <div class="movie-info">
        <h2>{movie.title}
            <span style="color:gold; font-size: 1rem;">★</span>
            {movie.vote_average.toFixed(1)}
        </h2>
        <p>{movie.release_date}</p>
    </div>
</a>

<style>
    .movie-card {
        display: flex;
        flex-direction: column;
        width: 100%;
        text-decoration: none;
        color: inherit;
        padding: 1rem;
        box-sizing: border-box;
    }

    .poster-container {
        position: relative;
        width: 100%;
    }

    img {
        width: 100%;
        height: 40vh;
        object-fit: cover;
        border-radius: 1rem;
        display: block;
    }

    .buttons-container {
        position: absolute;
        top: 5px;
        right: 5px;
        display: flex;
        flex-direction: column;
        gap: 3px;
    }

    .button {
        background-color: #007bff;
        color: white;
        border: 5px;
        border-radius: 50%;
        width: 30px;
        height: 30px;
        font-size: 18px;
        cursor: pointer;
        outline: 1px solid gray;
        box-shadow: gray 1px 1px 1px;
    }

    .movie-info {
        text-align: center;
        padding-top: 0.5rem;
        padding-bottom: 0;
    }

    p {
        font-size: 0.95rem;
        font-family: system-ui, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
        margin-top: 0;
        margin-bottom: 0;
    }

    h2 {
        font-size: 1.15rem;
        font-family: system-ui, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
        margin-bottom: 0.1rem;
        margin-top: 0;
    }
</style>

