import { redirect } from '@sveltejs/kit';

export function load({ cookies }) {
	const username = cookies.get('username') || '';
	if (!username || username === '') {
		redirect(307, '/auth-login');
	}
	console.log(username);
	return { username };
}
