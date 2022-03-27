const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const wishlist = Schema({
	title: {
		type: String,
		default: 'My Wishlist.'
	},
	products: [{
		type: ObjectId,
		ref: 'Product'
	}]
});

module.exports = mongoose.model('Wishlist', wishlist);
