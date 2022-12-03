import { writable } from 'svelte/store';

const nickname = localStorage.nickname;
// or localStorage.getItem('content')

// Set the stored value or a sane default.
export const content = writable(nickname || '');

// Anytime the store changes, update the local storage value.
content.subscribe((value) => (localStorage.content = value));
// or localStorage.setItem('content', value)
