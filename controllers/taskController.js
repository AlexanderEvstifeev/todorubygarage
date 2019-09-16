const express = require('express');
const router = express.Router();
const db = require('../config/DBconnection');
const bodyParser = require('body-parser');




router.get('/', (req, res) => {
        res.render('index')
    })
    router.post('/get-todo-project', (req, res) => {

        //db.query('SELECT * FROM projects', (err, rows) => {
            db.query('SELECT projects.Name, projects.id, GROUP_CONCAT( json_object( "tasksID", tasks.tasksID, "Title", tasks.Title, "status" ,tasks.status, "project_id", tasks.project_id ) )task FROM projects LEFT JOIN tasks ON tasks.project_id = projects.id GROUP BY projects.id', (err, rows) => {  
            if (err) throw err;

            //res.render('index', {todoProject : JSON.parse(JSON.stringify(rows))});
            res.json(rows);
            //console.log('rows = ', rows)
            //res.end(rows);
        })
    })

    router.post('/new_project', (req, res) => {
        let dateNow = Date.now();
        let obj = {
            Name: 'New TODO LIST' + dateNow,
        };

        let sql = 'INSERT INTO projects SET ?';
        let query = db.query(sql, [obj], (err, result) => {
            if (err) throw err;
            //console.log('resultmysql==', result.insertId);
        });
    })

    router.post('/edit-todo', (req, res) => {
        let idTodo = req.body.key;
        let textData = req.body.text;
        let sql = `UPDATE projects SET Name='${(textData)}' WHERE id='${(idTodo)}'`;
        let query = db.query(sql, (err, result, fields) => {
            if (err) throw err;
        })
    })


    router.post('/delete-todo', (req, res) => {
        let idTodo = req.body.key;
        console.log('req.body.key==', idTodo)
        let sql = `DELETE FROM projects WHERE id IN (${(idTodo)})`;
        let query = db.query(sql, (err, result, fields) => {
            if (err) throw err;
        })
    })

    module.exports = router;

