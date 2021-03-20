const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Float = require("mongoose-float").loadType(mongoose);

const bcrypt = require("bcrypt");
const SALT_WORK_FACTOR = 10;

const userSchema = new Schema({
	first_name: {
		type: String,
		required: true,
		minlength: 1,
	},
	last_name: {
		type: String,
		required: true,
		minlength: 1,
	},
	username: {
		type: String,
		required: true,
		unique: true,
		lowercase: true,
	},
	password: {
		type: String,
		required: true,
		minlength: 4,
	},
	dob: {
		type: Date,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
		lowercaes: true,
	},
	mailing_address: {
		type: String,
		required: true,
		unique: true,
	},
	points: {
		type: Number,
		default: 0,
	},
	pending_points: {
		type: Number,
		default: 0,
	},
});

// //password encryption taken from:
// // http://devsmash.com/blog/password-authentication-with-mongoose-and-bcrypt
// userSchema.pre("save", function (next) {
// 	var user = this;

// 	// only hash the password if it has been modified (or is new)
// 	if (!user.isModified("password")) return next();

// 	// generate a salt
// 	bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
// 		if (err) return next(err);

// 		// hash the password using our new salt
// 		bcrypt.hash(user.password, salt, function (err, hash) {
// 			if (err) return next(err);

// 			// override the cleartext password with the hashed one
// 			user.password = hash;
// 			next();
// 		});
// 	});
// });

// userSchema.methods.comparePassword = function (candidatePassword, cb) {
// 	bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
// 		if (err) return cb(err);
// 		cb(null, isMatch);
// 	});
// };

module.exports = mongoose.model("User", userSchema);
