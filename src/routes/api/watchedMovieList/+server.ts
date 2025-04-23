import { json } from '@sveltejs/kit';
import {prisma} from '$lib/server/db';

export async function GET() {
    try {
        const watchedMovies = await prisma.watchedMovieItem.findMany({
            orderBy: {
                watchedAt: 'desc'
            }
        });

        return json(watchedMovies);
    } catch (error) {
        console.error('Error fetching watched movies:', error);
        return json({ message: 'Failed to fetch watched movies' }, { status: 500 });
    }
}

export async function POST({ request }) {
    try {
        const movie = await request.json();

        const existingMovie = await prisma.watchedMovieItem.findFirst({
            where: {
                movieId: movie.id,
                userId: 'default-user'
            }
        });

        if (existingMovie) {
            return json({ success: false, message: 'Movie already marked as watched' });
        }

        const watchedMovie = await prisma.watchedMovieItem.create({
            data: {
                movieId: movie.id,
                title: movie.title,
                posterPath: movie.poster_path || '',
                voteAverage: movie.vote_average || 0,
                releaseDate: movie.release_date || '',
                overview: movie.overview || '',
                userId: 'default-user',
            }
        });

        return json({ success: true, data: watchedMovie });
    } catch (error) {
        console.error('Error marking movie as watched:', error);
        return json({ success: false, message: 'Failed to mark movie as watched' }, { status: 500 });
    }
}