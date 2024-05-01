/* Assignment: mysql to-do list  
 Author: Darpan Saini 
 Date: [2-3-2024] 
 Description: This node document is part of the backend problem no 3 . 
 Each section is structured according to the design specifications.

 note **************this is server side code where get post and delete operation is done *****************
 *********befor running this project please make sure to install require pakeges expess, cors, mysql, body-parser*******************
*/


const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use(cors())
// Database connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'Darpan',
  password: 'Password',
  database: 'todo_list',
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL');
});

// API to add a task
app.post('/add', (req, res) => {
  const task = req.body.task;
  const sql = 'INSERT INTO tasks (task) VALUES (?)';

  connection.query(sql, [task], (err, result) => {
    if (err) {
      console.error('Error adding task:', err);
      res.status(500).send('Internal Server Error');
      return;
    }

    res.status(200).send('Task added successfully');
  });
});

// API to get all tasks
app.get('/getTasks', (req, res) => {
  const sql = 'SELECT * FROM tasks';

  connection.query(sql, (err, result) => {
    if (err) {
      console.error('Error fetching tasks:', err);
      res.status(500).send('Internal Server Error');
      return;
    }

    res.status(200).json({ tasks: result });
  });
});


// API to delete a task
app.post('/delete', (req, res) => {
  const taskId = req.body.id;
  const sql = 'DELETE FROM tasks WHERE id = ?';

  connection.query(sql, [taskId], (err, result) => {
    if (err) {
      console.error('Error deleting task:', err);
      res.status(500).send('Internal Server Error');
      return;
    }

    res.status(200).send('Task deleted successfully');
  });
});



app.listen(port, () => {
  console.log(`Backend server is running at http://localhost:${port}`);
});

