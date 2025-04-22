import { writable } from 'svelte/store';

export const searchQuery = writable('');

export const currentlyOpenMenu = writable<string | null>(null);