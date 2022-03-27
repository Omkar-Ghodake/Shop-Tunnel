const mongoose = require('mongoose');

const mongoURI = process.env.MONGODB_URI || 'mongodb+srv://omkar-ghodake:Chinu%401831%24@cluster0.w5b4a.mongodb.net/Shop-Tunnel?retryWrites=true&w=majority';

const connectToMongo = () => {
	mongoose.connect(mongoURI, () => {
		console.log('Connected to Mongo successfully.');
	});
}

module.exports = connectToMongo;