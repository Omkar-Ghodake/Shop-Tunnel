const express = require('express');
const Admin = require('../models/adminLogin');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

// secret code for jwt
const JWT_SECRET = 'login@Chinu$1831';


// Route 1: Creating admin
router.post('/create-admin', [
	body('name', 'Name Invalid.').isLength({ min: 4 }),
	body('username', 'Username Invalid.').isLength({ min: 5 }),
	body('password', 'Password Invalid.').isLength({ min: 5 })
], async (req, res) => {
	let success = false;

	const errors = validationResult(req);

	if (!errors.isEmpty) {
		res.status(400).json({ success, errors: errors.array() })
	}

	try {
		let admin = await Admin.findOne({ username: req.body.usermame });
		if (admin) {
			success = false;
			res.status(400).json({ success, error: 'User already exists.' })
		}

		// password hashing
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(req.body.password, salt);

		admin = Admin.create({
			name: req.body.name,
			username: req.body.username,
			password: hashedPassword
		});

		//creating json web token
		const payload = {
			admin: { id: admin.id }
		}

		const authToken = jwt.sign(payload, JWT_SECRET);

		success = true;

		res.json({ success, authToken });
	} catch (error) {
		res.status(400).json({ success, error: 'Could not create admin.' })
	}
})

// Route 2: Authorize
router.post('/login', [
	body('username', 'Username Invalid.').exists(),
	body('password', 'Password Invalid.').exists()
], async (req, res) => {
	let success = false;
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ success, errors: 'Invalid Credentials.' })
	}

	const { username, password } = req.body;

	try {
		let admin = await Admin.findOne({ username });
		const passwordCompare = await bcrypt.compare(password, admin.password);

		if (!admin) {
			success = false;
			res.status(400).json({ success, error: 'Could not find admin.' });
		} else if (!passwordCompare) {
			success = false;
			res.status(400).json({ success, error: 'Invalid Password.' })
		} else {
			//creating json web token
			const payload = {
				admin: { id: admin.id }
			}
			const authToken = jwt.sign(payload, JWT_SECRET);
			success = true;
			res.json({ success, authToken });
		}



	} catch (error) {
		res.status(500).send('Internal Server Error.')
	}
});


module.exports = router;