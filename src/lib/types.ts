export type Movie = {
    id: number;
    title: string;
    poster_path: string;
    vote_average: number;
    release_date: string;
    overview?: string;
    searchTerms?: string;
};

export interface Position {
    x: number;
    y: number;
}

export interface MenuItem {
    name: string;
    onClick?: () => void;
    displayText?: string;
    class?: string;
}