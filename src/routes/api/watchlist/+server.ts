import { json } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';
import {prisma} from '$lib/server/db';

export const GET: RequestHandler = async () => {
    try {
        const watchList = await prisma.watchlistItem.findMany({
            orderBy: {
                addedAt: 'desc'
            }
        });

        return json(watchList);
    } catch (error) {
        console.error('Error fetching watchlist:', error);
        return json({ message: 'Failed to fetch watchlist' }, { status: 500 });
    }
};

export const POST: RequestHandler = async ({ request }) => {
    try {
        const movie = await request.json();

        const exists = await prisma.watchlistItem.findFirst({
            where: {
                movieId: movie.id
            }
        });

        if (exists) {
            return json({ success: false, message: 'Movie already in watchlist' });
        }

        const watchListMovie = await prisma.watchlistItem.create({
            data: {
                movieId: movie.id,
                title: movie.title,
                posterPath: movie.poster_path || '',
                voteAverage: movie.vote_average || 0,
                releaseDate: movie.release_date || '',
                overview: movie.overview || ''
            }
        });

        return json({ success: true, data: watchListMovie });
    } catch (error) {
        console.error('Error adding movie to watchlist:', error);
        return json({ success: false, message: 'Failed to add movie to watchlist' }, { status: 500 });
    }
};
