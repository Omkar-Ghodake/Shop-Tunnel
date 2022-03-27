const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let formatDate = new Date();

const adminSchema = new Schema({
	username: {
		type: String,
		required: true
	},
	password: {
		type: String,
		require: true
	},
	date: {
		type: Date,
		default: formatDate.toLocaleString('en-US')
	}
});

module.exports = mongoose.model('Admin', adminSchema);



