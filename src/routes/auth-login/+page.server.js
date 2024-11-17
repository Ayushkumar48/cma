import { redirect, fail } from '@sveltejs/kit';
import User from '$lib/models/user.js';
import bcrypt from 'bcrypt';
import { connectDB } from '$lib/server/db.js';

export async function load({ cookies }) {
	if (cookies.get('username')) {
		redirect(307, '/');
	}
}

export const actions = {
	default: async ({ cookies, request }) => {
		await connectDB();
		const data = await request.formData();
		const username = data.get('username');
		const password = data.get('password');
		try {
			const existingUsername = await User.findOne({ username });
			if (!existingUsername) {
				return fail(400, {
					message: "User doesn't exists.",
					success: false
				});
			}
			const isMatch = await bcrypt.compare(password, existingUsername.password);
			if (!isMatch) {
				return fail(400, { message: 'Invalid username or password.', success: false });
			}
			cookies.set('username', username, {
				path: '/',
				httpOnly: true,
				maxAge: 60 * 60 * 24 * 7 * 4
			});
			cookies.set('name', existingUsername.name, {
				path: '/',
				httpOnly: true,
				maxAge: 60 * 60 * 24 * 7 * 4
			});
			return {
				message: 'Login successful!',
				success: true
			};
		} catch (err) {
			console.log(err);
			return fail(500, {
				message: 'Internal server error. Please try again later.',
				success: false
			});
		}
	}
};
