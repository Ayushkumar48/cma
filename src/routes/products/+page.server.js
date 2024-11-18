import { redirect } from '@sveltejs/kit';

export function load({ cookies }) {
	const username = cookies.get('username') || '';
	if (!username || username === '') {
		throw redirect(307, '/auth-login');
	}
	const baseurl = process.env.BASEURL;
	return { username, baseurl };
}
