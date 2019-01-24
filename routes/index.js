var express = require('express');
var router = express.Router();
var mysql      = require('mysql');
const config = require('../config');
var connection = mysql.createConnection(config);
connection.connect();
console.log('i connnected')
/* GET home page. */
router.get('/', function(req, res, next) {
  const selectQuery = 'SELECT * FROM tasks;';
  connection.query(selectQuery,(err,results)=>{
    console.log(results)
    res.render('index', { 
      taskArray: results,
    });
  })
});

router.post('/addItem', function(req,res,next) {
  const newTask = req.body.newTask;
  const newTaskDate = req.body.newTaskDate;
  // we know what the user submitted in the form data
  // it comes to this route
  // we store those values as a var, and then insert them into mySQL

  // this is bad because of SQL injections
  // const insertQuery = `INSERT INTO tasks (taskName, taskDate)
  // VALUES
  // ('${newTask}',${newTaskDate});`;
  // console.log(insertQuery)

  // SQL injection is when a user inserts a SQL statement into a form
  // to run SQL when the dev didn't intend

  const insertQuery = `INSERT INTO tasks (taskName, taskDate)
    VALUES
    (?,?);`;

  connection.query(insertQuery,[newTask,newTaskDate],(err, results)=>{
    if(err){
      throw err;
    }else{
      res.redirect('/');
    }
  })
})

module.exports = router;
