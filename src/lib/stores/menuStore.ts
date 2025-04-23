import { writable } from 'svelte/store';

export const currentlyOpenMenu = writable<string | null>(null);