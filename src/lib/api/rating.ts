export async function saveRating(movieId: number, rating: number): Promise<boolean> {
    try {
        const response = await fetch('/api/rating', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ movieId, rating })
        });
        return response.ok;
    } catch {
        return false;
    }
}

export async function fetchRating(movieId: number): Promise<number | null> {
    try {
        const response = await fetch(`/api/rating?movieId=${movieId}`);
        if (!response.ok) return null;
        const data = await response.json();
        return typeof data.rating === 'number' ? data.rating : null;
    } catch {
        return null;
    }
}