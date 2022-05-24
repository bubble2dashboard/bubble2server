const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const connectDB = require('./config/db.js');

const User = require('./models/User.js');

// connecting to database

connectDB();

const port =process.env.PORT || 5000;
app.listen(port, function () {
	console.log('server is listening at port 5000');
});

app.get('/', function (request, response) {
	response.send('welcome to the server');
});

app.post('/api/auth/register', async function (req, res) {
	const user = await User.create(req.body);
	res.status(201).json({
		success: true,
		data: user,
	});
});

app.post('/api/auth/login', async function (req, res) {
	console.log(req.body.password);

	const user = await User.find({
		userName: req.body.userName,
		password: req.body.password,
	});

	if (user) {
		res.status(200).json({
			success: true,
			data: user,
		});
	} else {
		res.status(400).json({
			success: false,
			data: null,
		});
	}
});
