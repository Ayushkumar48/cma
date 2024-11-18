import { fail, redirect } from '@sveltejs/kit';
import User from '$lib/models/user.js';
import bcrypt from 'bcrypt';
import { connectDB } from '$lib/server/db.js';

const saltRounds = 10;

export async function load({ cookies }) {
	await connectDB();
	if (cookies.get('username')) {
		throw redirect(307, '/products');
	}
}

export const actions = {
	default: async ({ request, cookies }) => {
		const data = await request.formData();
		const name = data.get('name');
		const username = data.get('username');
		const email = data.get('email');
		const password = data.get('password');
		const confirmPassword = data.get('confirm-password');
		if (username.length < 4) {
			return fail(400, {
				message: 'Username should be at least 4 characters long.',
				success: false
			});
		}
		if (confirmPassword !== password) {
			return fail(400, {
				message: 'Both passwords should match.',
				success: false
			});
		}
		try {
			const existingUsername = await User.findOne({ username });
			if (existingUsername) {
				return fail(400, {
					message: 'Username already exists.',
					success: false
				});
			}
			const existingEmail = await User.findOne({ email });
			if (existingEmail) {
				return fail(400, {
					message: 'Email already exists.',
					success: false
				});
			}
			const hashedPassword = await bcrypt.hash(password, saltRounds);
			const newUser = new User({
				name,
				username,
				email,
				password: hashedPassword
			});
			await newUser.save();
			cookies.set('username', username, {
				path: '/',
				httpOnly: true,
				maxAge: 60 * 60 * 24 * 7 * 4
			});
			cookies.set('name', name, {
				path: '/',
				httpOnly: true,
				maxAge: 60 * 60 * 24 * 7 * 4
			});
			return {
				message: 'Account created successfully!!!',
				success: true
			};
		} catch (error) {
			console.error('Error checking user:', error);
			return fail(500, {
				message: 'Internal server error. Please try again later.',
				success: false
			});
		}
	}
};
