const express = require('express');
const router = express.Router();
const db = require('../config/DBconnection');
const bodyParser = require('body-parser');


    router.get('/', (req, res) =>{
        res.render('index');
    });

    router.post('/new-task', (req, res, next) =>{
        console.log('Request Type:', req.method);
        req.accepts('application/json')
        let idTask = req.body.key;
        let textTitle = req.body.Title;
        let obj = {
            Title: textTitle,
            project_id: idTask,
            status: 'true'
        };

        let sql = 'INSERT INTO tasks SET ?';
        let query = db.query(sql, [obj], (err, rows, fields) => {
            if (err) throw err;
            //console.log('resultmysql==', result.insertId);
            //res.setHeader('Access-Control-Allow-Origin');
           //res.json(result);
           //return next();
           res.set('Content-Type', 'text/html')
           console.log('rows.insertId------->', rows.insertId);
           res.json(rows.insertId);
        });
       // res.end();
    });
    
    router.post('/complete-task', (req, res) =>{
        let idTask = req.body.key;
        let status = req.body.status;
        let sql = `UPDATE tasks SET status='${(status)}' WHERE tasksID='${(idTask)}'`;
        let query = db.query(sql, (err, result, fields) => {
            if (err) throw err;
            //console.log('result------->',result);
            res.json(result);
        })
    });

    router.post('/delete-task', (req, res) => {
        let idTask = req.body.key;
        console.log('req.body.key==', idTask)
        let sql = `DELETE FROM tasks WHERE tasksID IN (${(idTask)})`;
        let query = db.query(sql, (err, result, fields) => {
            if (err) throw err;
        })
    })


    module.exports = router;