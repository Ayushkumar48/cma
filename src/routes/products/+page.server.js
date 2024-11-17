import { redirect } from '@sveltejs/kit';

import dotenv from 'dotenv';
dotenv.config();

export function load({ cookies }) {
	const username = cookies.get('username') || '';
	if (!username || username === '') {
		throw redirect(307, '/auth-login');
	}
	const baseurl = process.env.BASEURL;
	console.log(username + ' ' + baseurl);
	return { username, baseurl };
}
