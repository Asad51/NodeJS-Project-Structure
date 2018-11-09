let Todo = require('../models/todo.js');

module.exports = {
	get: function(req, res, next){
		res.send("Enter todo details");
	},

	postDetails: function(req, res, next){
		if (Object.keys(req.body).length !== 1) {
	        res.send("Invalid format");
	        return;
	    }

	    var title = req.body.title;
	    var created_at = req.body.created_at;

	    req.checkBody('title', 'Title is required').notEmpty();
	    var errors = req.validationErrors();

	    if (errors) {
	        res.send(errors);
	        return;
        }

        var newTodo = new Todo({
        	title: title,
        	created_at: created_at
        });

        newTodo.save(newTodo, function(err, todo){
        	if(err){
        		res.status(500).send("Server Error");
        	}
        	else{
        		res.send(todo);
        	}
        })
	},

	getDetails: function(req, res, next){
		var title = req.params.title;
		Todo.find({title: title}, function(err, todos){
			if(err){
				res.send("Internal Error");
				return;
			}
			if(!todos.length){
				res.send("No data found");
			}
			else{
				res.send(todos);
			}
		});
	},

	editDetails: function(req, res, next){
		
	}
}