import { json } from '@sveltejs/kit';

export async function POST({ cookies }) {
	cookies.delete('username', { path: '/' });
	cookies.delete('name', { path: '/' });
	return json({ success: true });
}
