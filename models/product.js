const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const product = new Schema({
	title: String,
	price: Number,
	likes: {
		type: Number,
		default: 0
	},
	imgUrl: String
});

module.exports = mongoose.model('Product', product);