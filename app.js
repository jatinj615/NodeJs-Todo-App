var express = require('express');

var path = require('path');

var app = express();

var bodyParser = require('body-parser');

var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/my_todo_db');

app.use(bodyParser());

app.set('view engine', 'ejs');

var todoSchema = mongoose.Schema({
	title: String,
	body: String
});

var Todo = mongoose.model("Todo", todoSchema);

app.get('/todo', function(req, res){
	Todo.find({}, function(err, data){
		if(err) throw err;
		res.render("index", {todo: data});
	});
});

app.post('/todo', function(req, res){
	var todoItem = req.body;
	if (!todoItem.title || !todoItem.body) {
		res.render('show_message', {
			message: "Sorry you provided wrong info"});
	}else{
		var item = Todo({
			title : todoItem.title,
			body : todoItem.body 
		});	
		item.save(function(err){
			if (err) throw err;
		});
		res.redirect('/todo');
	}
});

app.get('/todo/:id', function(req, res){
	Todo.findByIdAndRemove(req.params.id, function(err, response){
		res.redirect('/todo');
	});
	
});

app.listen(8080);