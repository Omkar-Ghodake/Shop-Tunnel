const connectToMongo = require('./db');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

const port = 5000;
connectToMongo();

app.use(express.json());

app.use('/', require('./routes/product'));
app.use('/', require('./routes/wishlists'));
app.use('/admin', require('./routes/adminAuth'));

// heroku
if (process.env.NODE_ENV === 'production'); {
	app.use(express.static('client/build'));
}

app.listen(port, () => {
	console.log(`Swag Shop API running at http://localhost:${port}`);
});

