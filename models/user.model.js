const mongoose = require("mongoose");
const validator = require('validator');

const userSchema = new mongoose.Schema({
	id: {
		type: mongoose.Schema.Types.ObjectId,
		auto: true,
	},
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
		validator: [validator.isEmail, 'Please enter a valid email']
	},
	phone: {
		type: String,
		required: true,
		validator: [validator.isMobilePhone, 'Please enter a valid phone number']
	},
	password: {
		type: String,
		required: true,
	},
});
module.exports = mongoose.model("User", userSchema);