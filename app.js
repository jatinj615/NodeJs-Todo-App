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

app.get('/', function(req, res){
	res.render("index");
});

app.post('/', function(req, res){
	res.send(JSON.stringify(req.body.name));
});

app.listen(8080);