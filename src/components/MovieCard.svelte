<script>
    export let movie;
</script>

<div class="movie-card">
    <img src={'https://image.tmdb.org/t/p/w500' + movie.poster_path} alt="{movie.title}"/>
    <div class="movie-info">
        <h2>{movie.title}
            <span style="color:gold; font-size: 1rem;">★</span>
            {movie.vote_average.toFixed(1)}</h2>
        <p>{movie.release_date}</p>

    </div>
</div>

<style>
    img {
        width: 100%;
        height: 40vh;
        object-fit: cover;
        border-radius: 1rem;
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

    .movie-card {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: 1rem;
        margin-bottom: 1rem;
    }
</style>