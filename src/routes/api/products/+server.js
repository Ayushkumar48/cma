import { json } from '@sveltejs/kit';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import { v4 as uuidv4 } from 'uuid';
import { connectDB } from '$lib/server/db.js';
import Car from '$lib/models/car.js';
import { CLOUDINARY_CLOUD_NAME, API_KEY, API_SECRET } from '$env/static/private';

cloudinary.config({
	cloud_name: CLOUDINARY_CLOUD_NAME,
	api_key: API_KEY,
	api_secret: API_SECRET
});

const storage = multer.memoryStorage();
const upload = multer({ storage });

await connectDB();

async function streamToBuffer(readableStream) {
	const reader = readableStream.getReader();
	const chunks = [];
	let result;
	do {
		result = await reader.read();
		if (result.value) {
			chunks.push(result.value);
		}
	} while (!result.done);
	return Buffer.concat(chunks);
}

export async function POST({ request }) {
	try {
		const formData = await request.formData();
		const files = formData.getAll('pictures');
		const data = Object.fromEntries(formData);

		const { brand, model, color, modelyear, price, description, username } = data;

		if (!files || files.length === 0) {
			return json({ error: 'No pictures uploaded' }, { status: 400 });
		}

		const uploadPromises = files.map(async (file) => {
			const buffer = await streamToBuffer(file.stream());
			return new Promise((resolve, reject) => {
				cloudinary.uploader
					.upload_stream({ resource_type: 'auto', folder: 'cars' }, (error, result) => {
						if (error) reject(error);
						else resolve({ url: result.secure_url, public_id: result.public_id });
					})
					.end(buffer);
			});
		});

		const uploadedUrls = await Promise.all(uploadPromises);

		const user = await Car.findOne({ username });
		const uuid = uuidv4();

		const newCar = {
			uuid,
			brand,
			model,
			color,
			model_year: modelyear,
			price,
			description,
			pictures: uploadedUrls
		};

		if (user) {
			user.carsData.push(newCar);
			await user.save();
		} else {
			const newCarData = new Car({ username, carsData: [newCar] });
			await newCarData.save();
		}

		return json({ success: true });
	} catch (error) {
		console.error('Error during file upload:', error);
		return json({ message: 'Failed to upload the data' }, { status: 500 });
	}
}

export async function GET({ url }) {
	try {
		const username = url.searchParams.get('username');
		const user = await Car.findOne({ username });

		if (user) {
			return json(user);
		} else {
			return json({ success: false, message: 'User not found' }, { status: 400 });
		}
	} catch (error) {
		console.error(error);
		return json({ success: false, message: 'Server error' }, { status: 500 });
	}
}

export async function DELETE({ url }) {
	try {
		const uuid = url.searchParams.get('uuid');
		const username = url.searchParams.get('username');

		if (!uuid || !username) {
			return json({ success: false, message: 'UUID and username are required' }, { status: 400 });
		}

		const user = await Car.findOneAndUpdate(
			{ username },
			{ $pull: { carsData: { uuid } } },
			{ new: true }
		);

		if (user) {
			return json({ success: true, data: user });
		} else {
			return json({ success: false, message: 'User not found' }, { status: 404 });
		}
	} catch (error) {
		console.error('Error deleting car:', error);
		return json({ success: false, message: 'Server error' }, { status: 500 });
	}
}
