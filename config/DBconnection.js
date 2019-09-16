const mysql = require('mysql');

const connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'todo'
});
connection.connect((err) => {
	if(err){
		throw err;
	}
	console.log('MySql connected...');
});


connection.query("SET SESSION wait_timeout = 604800"); // 7 days timeout



module.exports = connection;