const router = require("express").Router();
let User = require("../models/user.model");

router.route("/").get((req, res) => {
	User.find()
		.then((users) => res.json(users))
		.catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
	const first_name = req.body.first_name;
	const last_name = req.body.last_name;
	const username = req.body.username;
	const password = req.body.password;
	const dob = req.body.dob;
	const email = req.body.email;
	const mailing_address = req.body.mailing_address;
	// const points = Number(req.body.points);
	const points = 0;
	// const pending_points = Number(req.body.pending_points);
	const pending_points = 0;

	const newUser = new User({
		first_name,
		last_name,
		username,
		password,
		dob,
		email,
		mailing_address,
		points,
		pending_points,
	});

	newUser
		.save()
		.then(() => res.json("User added!"))
		.catch((err) => res.status(400).json("Error: " + err));
});

router.route("/update/:id").post((req, res) => {
	User.findById(req.params.id)
		.then((user) => {
			user.first_name = req.body.first_name;
			user.last_name = req.body.last_name;
			user.password = req.body.password;
			user.dob = Date.parse(req.body.dob);
			user.mailing_address = req.body.mailing_address;
			user.points = req.body.points;
			user.pending_points = req.body.pending_points;
			user
				.save()
				.then(() => res.json("User updated!"))
				.catch((err) => res.status(400).json("Error: " + err));
		})
		.catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").get((req, res) => {
	User.findById(req.params.id)
		.then((user) => res.json(user))
		.catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
