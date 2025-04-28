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

<title>Részletes információk</title>

<div class="movie-details">
    <div class="poster">
        <img src={'https://image.tmdb.org/t/p/w500' + movieDetails.poster_path} alt="{movieDetails.title}" />
    </div>
    <div class="details">
        <div class="title-row">
            <h1>{movieDetails.title}</h1>
            <button on:click={goBack} class="back-button">Vissza</button>
        </div>
        <p><strong>Megjelenés dátuma:</strong> {movieDetails.release_date}</p>
        <p><strong>Értékelés:</strong> {movieDetails.vote_average.toFixed(1)} <span style="color:gold; font-size: 1rem;">★</span></p>
        <p><strong>Leírás:</strong> {movieDetails.overview}</p>
    </div>
</div>

<div class="actors-section">
    <h2>Főszereplők</h2>
    <div class="cast-list">
        {#each mainCast as actor}
            <div class="cast-item">
                <div class="actor-image">
                    {#if actor.profile_path}
                        <img src={'https://image.tmdb.org/t/p/w185' + actor.profile_path} alt="{actor.name}" />
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

<style>
    .movie-details {
        display: flex;
        flex-wrap: wrap;
        gap: 2rem;
        align-items: flex-start;
        justify-content: center;
        margin-bottom: 0.5rem;
        border-bottom: 2px solid #f5f5f6;
        padding: 2rem 2rem 0.8rem;
    }

    .poster img {
        width: 300px;
        border-radius: 10px;
        box-shadow: 0 12px 24px rgba(0, 0, 0, 0.37);
    }

    .details {
        flex: 1;
        max-width: 600px;

    }

    .details h1 {
        margin: 0;
        font-size: 2.4rem;
        font-weight: 800;
        letter-spacing: -0.02em;
        color: black;
        text-transform: uppercase;
        line-height: 1.2;
    }

    .details p {
        margin-bottom: 1.2rem;
        line-height: 1.7;
        font-size: 1.05rem;
        color: black;
        letter-spacing: 0.01em;
        font-weight: 500;
    }

    .details strong {
        color: #070809;
        font-weight: 800;
        text-transform: uppercase;
        font-size: 0.9rem;
        letter-spacing: 0.05em;
        display: inline-block;
        margin-right: 0.5rem;
    }

    .title-row {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .back-button {
        color: #D9DBF1;
        font-weight: 600;
        font-size: 0.95rem;
        background-color: #0B3948;
        border: none;
        border-radius: 8px;
        padding: 10px 18px;
        cursor: pointer;
        transition: all 0.2s ease;
        display: flex;
        align-items: center;
        gap: 8px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    }

    .back-button:hover {
        background-color: #0a2e3a;
        transform: translateY(-2px);
    }

    .actors-section {
        width: 100%;
        padding: 0 20px;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .actors-section h2 {
        margin-bottom: 20px;
        text-align: center;
        font-size: 1.8rem;
        font-weight: 800;
        letter-spacing: -0.02em;
        color: #050505;
        text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.2);
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
        width: 160px;
        height: 220px;
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
        box-shadow: 0 12px 24px rgba(0, 0, 0, 0.3);
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
        font-weight: 700;
        margin-bottom: 4px;
        font-size: 1.1rem;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        color: #0B3948;
        max-width: 160px;
    }

    .character-name {
        font-size: 0.95rem;
        color: rgba(14, 20, 21, 0.8);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        max-width: 160px;
        font-style: italic;
    }
</style>
