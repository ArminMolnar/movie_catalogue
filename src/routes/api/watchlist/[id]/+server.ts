import { json } from '@sveltejs/kit';
import {prisma}  from '$lib/server/db';

export async function DELETE({ params }) {
    try {
        const movieId = parseInt(params.id);

        await prisma.watchlistItem.deleteMany({
            where: {
                movieId: movieId,
                userId: 'default-user'
            }
        });

        return json({ success: true });
    } catch (error) {
        console.error('Error removing from watchlist:', error);
        return json({ success: false, message: 'Failed to remove movie from watchlist' }, { status: 500 });
    }
}