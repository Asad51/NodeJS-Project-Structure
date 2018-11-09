let app = require('express')();

let home = require('../controllers/home.js');

app.route('/')
	.get(home.get);

module.exports = app;