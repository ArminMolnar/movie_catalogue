<script lang="ts">
    import { goto } from '$app/navigation';
    export let data;
    const { movieDetails } = data;

    function goBack() {
        if (window.history.length > 1) {
            window.history.back();
        } else {
            goto(`/search/${movieDetails.title.split(' ').join('-')}`);
        }
    }
</script>

    <div class="movie-details">
        <div class="poster">
            <img src={'https://image.tmdb.org/t/p/w500' + movieDetails.poster_path} alt="{movieDetails.title}" />
        </div>
        <div class="details">
            <h1>{movieDetails.title}</h1>
            <p><strong>Megjelenés dátuma:</strong> {movieDetails.release_date}</p>
            <p><strong>Értékelés:</strong> {movieDetails.vote_average.toFixed(1)} <span style="color:gold; font-size: 1rem;">★</span></p>
            <p><strong>Leírás:</strong> {movieDetails.overview}</p>
            <button on:click={goBack} class="back-button">← Vissza</button>
        </div>
    </div>

<style>
    .movie-details {
        display: flex;
        flex-wrap: wrap;
        gap: 2rem;
        align-items: flex-start;
        justify-content: center;
        padding: 2rem;
    }

    .poster img {
        width: 300px;
        border-radius: 10px;
    }

    .details {
        flex: 1;
        max-width: 600px;
    }

    .details h1 {
        margin-bottom: 1rem;
    }

    .details p {
        margin-bottom: 1rem;
        line-height: 1.5;
        font-family: system-ui, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    }

    .back-button {
        display: inline-block;
        margin-top: 2rem;
        text-decoration: none;
        border-radius: 5px;
        color: black;
        font-weight: bold;
        font-size: 1.6rem;
        font-family: system-ui, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    }

    .back-button:hover {
        text-decoration: underline;
    }
</style>
