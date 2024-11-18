// src/routes/api/deleteAccount/+server.js
import { connectDB } from '$lib/server/db';
import User from '$lib/models/user.js';
import { fail, json } from '@sveltejs/kit';

export async function DELETE({ request, cookies }) {
	try {
		await connectDB();
		const { username } = await request.json();
		const result = await User.deleteOne({ username });
		if (result.deletedCount === 1) {
			cookies.delete('username', { path: '/' });
			cookies.delete('name', { path: '/' });
			return json({ success: true });
		} else {
			return fail(404, { message: 'User not found' });
		}
	} catch (err) {
		console.error(err);
		return json({ message: 'Failed to delete the user.' }, { status: 500 });
	}
}
