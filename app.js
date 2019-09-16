const express = require('express');
const app = express();
const path = require('path');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const todoController = require('./controllers/todoController');
const taskController = require('./controllers/taskController');
const db = require('./config/DBconnection');


app.set('view engine', 'pug');
app.use(express.json());
//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '/public')));
app.set('views', path.join(__dirname, 'views'));




app.use('/', taskController);
app.use('/todo', todoController)



app.listen(3000, () => {
	console.log(`listening on port 3000`);
});
