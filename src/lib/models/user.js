import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
	name: String,
	username: { type: String, unique: true },
	email: { type: String, unique: true },
	password: String
});

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;
