import mongoose from 'mongoose';
if (process.env.NODE_ENV !== 'production') {
	import('dotenv').then((dotenv) => dotenv.config());
}

const mongouri = process.env.MONGODB_URI;

console.log('Mongo URI:', mongouri);
export async function connectDB() {
	try {
		if (mongoose.connection.readyState === 0) {
			await mongoose.connect(mongouri, { useNewUrlParser: true, useUnifiedTopology: true });
			console.log('Connected to MongoDB');
		} else {
			console.log('Already connected to MongoDB');
		}
	} catch (err) {
		console.error('Error connecting to MongoDB:', err);
	}
}
