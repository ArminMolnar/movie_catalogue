export type Movie = {
    id: number;
    title: string;
    poster_path: string;
    vote_average: number;
    release_date: string;
    overview?: string;
    searchTerms?: string; // We'll add this for client-side filtering
};