import { json } from '@sveltejs/kit';
import {prisma}  from '$lib/server/db';

export async function DELETE({ params }) {
    try {
        const movieId = parseInt(params.id);

        await prisma.$transaction([
            prisma.watchedMovieItem.deleteMany({ where: { movieId } }),
            prisma.movieRating.deleteMany({ where: { movieId } })
        ]);

        return json({ success: true });
    } catch (error) {
        console.error('Error removing from watched list:', error);
        return json({ success: false, message: 'Failed to remove movie from watched list' }, { status: 500 });
    }
}