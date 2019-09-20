const express = require('express');
const router = express.Router();
const db = require('../config/DBconnection');
const bodyParser = require('body-parser');


    router.get('/', (req, res) =>{
        res.render('index');
    });

    router.post('/new-task', (req, res, next) =>{

        let idTask = req.body.key;
        let textTitle = req.body.Title;
        let obj = {
            Title: textTitle,
            project_id: idTask,
            status: 'false'
        };
        if((textTitle === 0 || textTitle.trim())){
        let sql = 'INSERT INTO tasks SET ?';
        let query = db.query(sql, [obj], (err, rows, fields) => {
            if (err) throw err;

           res.set('Content-Type', 'text/html')

           res.json(rows.insertId);
        });
    }

    });
    
    router.put('/complete-task', (req, res) =>{
        let idTask = req.body.key;
        let status = req.body.status;
        let sql = `UPDATE tasks SET status='${(status)}' WHERE tasksID='${(idTask)}'`;
        let query = db.query(sql, (err, result, fields) => {
            if (err) throw err;
            //res.json(result);
        })
    });
    router.delete('/delete-task', (req, res) => {
        let idTask = req.body.key;
        console.log('req.body.key==', idTask)
        let sql = `DELETE FROM tasks WHERE tasksID IN (${(idTask)})`;
        let query = db.query(sql, (err, result, fields) => {
            if (err) throw err;
        })
    })
    router.put('/edite-task', (req, res) => {
        let idTask = req.body.key;
        let textData = req.body.Title;
        if((textData === 0 || textData.trim())){
            console.log('textData', textData)
            let sql = `UPDATE tasks SET Title='${(textData)}' WHERE tasksID='${(idTask)}'`;
            let query = db.query(sql, (err, result, fields) => {
                if (err) throw err;
            })
        }

    })

    module.exports = router;
