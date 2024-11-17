import { connectDB } from '$lib/server/db.js';
import { redirect, fail } from '@sveltejs/kit';
import User from '$lib/models/user.js';
import bcrypt from 'bcrypt';

export async function load({ cookies }) {
	await connectDB();
	const username = cookies.get('username') || '';
	if (!username || username === '') {
		throw redirect(307, '/auth-login');
	} else {
		const existingUser = await User.findOne({ username });
		const user = JSON.parse(JSON.stringify(existingUser));
		return { user };
	}
}

export const actions = {
	default: async ({ request, cookies }) => {
		try {
			const data = await request.formData();
			const name = data.get('name');
			const username = data.get('username');
			const email = data.get('email');
			const password = data.get('password');

			const updateData = {
				name,
				email
			};

			if (password && password.trim() !== '') {
				const hashedPassword = await bcrypt.hash(password, 10);
				updateData.password = hashedPassword;
			}

			await User.findOneAndUpdate({ username }, { $set: updateData }, { new: true });
			cookies.delete('name', { path: '/' });
			cookies.set('name', name, {
				path: '/',
				httpOnly: true,
				maxAge: 60 * 60 * 24 * 7 * 4
			});

			return {
				message: 'Profile updated successfully!',
				success: true
			};
		} catch (error) {
			console.error('Error updating user:', error);
			return fail(500, {
				message: 'Internal server error. Please try again later.',
				success: false
			});
		}
	}
};
