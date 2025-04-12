<script lang="ts">
    export let movie: {
        id: number;
        title: string;
        poster_path: string;
        vote_average: number;
        release_date: string;
    };
</script>

<a href={`/movieDetails/${movie.id}`} class="movie-card">
    <div class="movie-card">
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
    </div>
</a>

<style>
    .movie-card {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: 1rem;
        margin-bottom: 1rem;
        text-decoration: none;
        color:inherit;
    }

    .poster-container {
        position: relative;
    }

    img {
        width: 100%;
        height: 40vh;
        object-fit: cover;
        border-radius: 1rem;
    }

    .buttons-container {
        position: absolute;
        top: 5px;
        right: 5px;
        display: flex;
        flex-direction: column;
        gap: 5px;
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
        height: 5vh;
        text-align: center;
    }

    p {
        font-size: 0.95rem;
        font-family: system-ui, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
        margin-top: 0;
    }

    h2 {
        font-size: 1.15rem;
        font-family: system-ui, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
        margin-bottom: 0.25rem;
    }
</style>
