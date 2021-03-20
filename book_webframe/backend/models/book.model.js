const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookSchema = new Schema({
	isbn: {
		type: String,
		required: true,
		maxlength: 13,
		minlength: 10,
	},
	title: {
		type: String,
		required: true,
		minlength: 1,
	},
	author: {
		type: String,
		required: true,
		minlength: 1,
	},
	publishing_date: {
		type: Date,
		required: true,
	},
	posting_user: {
		type: String,
		required: true,
	},
	condition: {
		type: String,
		required: true,
	},
	book_points: {
		type: Number,
		required: true,
	},
	available: {
		type: Boolean,
		required: true,
		default: true,
	},
	image: {
		type: String,
		default: null,
	},
	swap: {
		requested: { type: Boolean, default: false },
		accepted: { type: Boolean, default: false },
		rejected: { type: Boolean, default: false },
		shipped: { type: Boolean, default: false },
		received: { type: Boolean, default: false },
		//we can do timestamp for this one
		request_date: { type: Date, default: null },
		requesting_user: { type: String, default: null },
	},
});

module.exports = mongoose.model("Book", bookSchema);
