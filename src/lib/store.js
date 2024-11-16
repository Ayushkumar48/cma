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

export async function addCar(data) {
	try {
		const formData = new FormData();
		for (const key in data) {
			if (key === 'pictures') {
				data.pictures.forEach((file) => formData.append('pictures', file));
			} else {
				formData.append(key, data[key]);
			}
		}

		const response = await fetch('/api/products', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		});

		if (!response.ok) {
			throw new Error('Failed to add car data');
		}

		const result = await response.json();
		products.update((items) => [...items, data]);
		console.log(result.message);
	} catch (error) {
		console.log(error);
	}
}

export function getCars() {
	let currentProducts;
	products.subscribe((value) => {
		currentProducts = value;
	})();
	return currentProducts;
}
