import { json } from '@sveltejs/kit';
import { prisma } from '$lib/server/db';

export async function POST({ request }) {
    try {
        const { movieId, rating } = await request.json();

        const savedRating = await prisma.movieRating.upsert({
            where: {movieId },
            update: { rating },
            create: { movieId, rating }
        });

        return json({ success: true, data: savedRating });
    } catch (error) {
        console.error('Error saving movie rating:', error);
        return json({ success: false, message: 'Failed to save movie rating' }, { status: 500 });
    }
}

export async function GET({ url }) {
    const movieId = Number(url.searchParams.get('movieId'));
    if (!movieId) return json({ rating: null });

    const rating = await prisma.movieRating.findUnique({
        where:  { movieId }
    });

    return json({ rating: rating?.rating ?? null });
}