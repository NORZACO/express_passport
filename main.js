const express = require('express');
const mysql = require('mysql2');
const { plaintext, encrypted } = require('./plaintext').default

const app = express();


const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Passord1',
  database: 'CourseDB'
});

connection.connect(function (err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
  console.log('connected as id ' + connection.threadId);
});

app.get('/', (req, res) => {
  connection.query('SELECT * FROM table_name', function (error, results, fields) {
    if (error) throw error;
    res.send(results);
  });
});



app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});


