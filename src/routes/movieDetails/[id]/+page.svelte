<script lang="ts">
    import { goto } from '$app/navigation';
    export let data;
    const { movieDetails, mainCast } = data;

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

<!-- Add the actors section below -->
<div class="actors-section">
    <h2>Főszereplők</h2>
    <div class="cast-list">
        {#each mainCast as actor}
            <div class="cast-item">
                <div class="actor-image">
                    {#if actor.profile_path}
                        <img
                                src={'https://image.tmdb.org/t/p/w185' + actor.profile_path}
                                alt="{actor.name}"
                        />
                    {:else}
                        <div class="no-image">No Image</div>
                    {/if}
                </div>
                <div class="actor-name">{actor.name}</div>
                <div class="character-name">{actor.character}</div>
            </div>
        {/each}
    </div>
</div>

<title>Részletes információk</title>


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

    .actors-section {
        margin-top: 0;
        padding: 0 20px;
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    .actors-section h2 {
        margin-bottom: 20px;
        text-align: center;
        font-size: 1.8rem;
    }

    .cast-list {
        display: grid;
        grid-template-columns: repeat(6, 1fr);
        gap: 20px;
        max-width: 800px;
        margin: 0 auto;
        justify-content: center;
    }

    .cast-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
    }

    .actor-image {
        width: 160px;  /* Fixed width */
        height: 220px; /* Fixed height (2:3 aspect ratio) */
        border-radius: 8px;
        overflow: hidden;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        margin-bottom: 10px;
    }

    .actor-image img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.3s ease;
    }

    .actor-image img:hover {
        transform: scale(1.05);
    }

    .no-image {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #e0e0e0;
        color: #757575;
        font-size: 0.9rem;
    }

    .actor-name {
        font-weight: bold;
        margin-bottom: 4px;
        font-size: 1.2rem;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .character-name {
        font-size: 1.05rem;
        color: black;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    /* Responsive adjustments */
    @media (max-width: 768px) {
        .cast-list {
            grid-template-columns: repeat(3, 1fr);
        }
    }

    @media (max-width: 480px) {
        .cast-list {
            grid-template-columns: repeat(2, 1fr);
        }
    }

</style>
