import { fetchMovie, fetchMovieCredits } from '$lib/api';

export async function load({ params }) {
    try {
        const movieId = parseInt(params.id, 10);

        const [movieDetails, movieCredits] = await Promise.all([
            fetchMovie(movieId),
            fetchMovieCredits(movieId)
        ]);

        const mainCast = movieCredits.cast
            .filter((actor: { order: number; }) => actor.order <= 5)
            .sort((a: { order: number; }, b: { order: number; }) => a.order - b.order);

        return {
            movieDetails,
            mainCast
        };
    } catch (error) {
        console.error('Error loading movie details:', error);
        return {
            status: 500,
            error: 'Failed to load movie details'
        };
    }
}


