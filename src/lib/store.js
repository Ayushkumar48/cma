import { writable } from 'svelte/store';

export let username = writable('');
export function setUsername(uname) {
	username.set(uname);
}

export function getUsername() {
	let currentValue;
	username.subscribe((value) => (currentValue = value))();
	return currentValue;
}

export let loggedIn = writable(false);

export function doLogin() {
	loggedIn.set(true);
}
export function doSignout() {
	loggedIn.set(false);
}
