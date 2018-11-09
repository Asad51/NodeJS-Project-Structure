var app = require('express')();

var todo = require('../controllers/todos.js');

app.route('/')
	.get(todo.get)
	.post(todo.postDetails);

app.route('/:title')
	.get(todo.getDetails);

module.exports = app;