import mongoose from 'mongoose';
const MONGODB_URI = import.meta.env.VITE_MONGODB_URI;

export async function connectDB() {
	try {
		if (mongoose.connection.readyState === 0) {
			await mongoose.connect(MONGODB_URI);
			console.log('Connected to MongoDB');
		} else {
			console.log('Already connected to MongoDB');
		}
	} catch (err) {
		console.error('Error connecting to MongoDB:', err);
	}
}
