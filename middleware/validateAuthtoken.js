var jwt = require('jsonwebtoken');

// secret code for jwt
const JWT_SECRET = 'login@Chinu$1831';

const validateAuthtoken = (req, res, next) => {
	// get user from jwt and add id to req object
	const token = req.header('auth-token');
	if (!token) {
		res.status(401).json({ error: 'Please authenticate using valid token.' });
	}

	try {
		const data = jwt.verify(token, JWT_SECRET);
		req.admin = data.admin;

		next();
	} catch (error) {
		res.status(401).json({ error: 'Please authenticate using a valid token' });
	}
}

module.exports = validateAuthtoken;