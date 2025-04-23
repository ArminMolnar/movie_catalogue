import { json } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';
import {prisma} from '$lib/server/db';

export const POST: RequestHandler = async ({ request }) => {
    try {
        const movie = await request.json();

        const existingMovie = await prisma.watchlistItem.findFirst({
            where: {
                movieId: movie.id,
                userId: 'default-user'
            }
        });

        if (existingMovie) {
            return json({ success: false, message: 'Movie already in watchlist' });
        }

        const watchlistItem = await prisma.watchlistItem.create({
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

        return json({ success: true, data: watchlistItem });
    } catch (error) {
        console.error('Error adding movie to watchlist:', error);
        return json({ success: false, message: 'Failed to add movie to watchlist' }, { status: 500 });
    }
};

export const GET: RequestHandler = async () => {
    try {
        const watchlist = await prisma.watchlistItem.findMany({
            where: {
                userId: 'default-user'
            },
            orderBy: {
                addedAt: 'desc'
            }
        });

        return json(watchlist);
    } catch (error) {
        console.error('Error fetching watchlist:', error);
        return json({ message: 'Failed to fetch watchlist' }, { status: 500 });
    }
};