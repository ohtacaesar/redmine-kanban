const express = require('express');
const app = express();
const port = 3000;
const axiosBase = require('axios');

const mysql = require('mysql');

const REDMINE_API_KEY = process.env.REDMINE_API_KEY;

const axios = axiosBase.create({
  baseURL: 'http://redmine:3000',
  headers: {
    'X-Redmine-API-Key': REDMINE_API_KEY
  }
});

const connection = mysql.createConnection({
  host: 'mysql_kanban',
  user: 'root',
  password: 'root',
  database: 'kanban'
});

connection.query(`
create table if not exists issues (
  issue_id int not null
, subject varchar(255) not null
, description text not null

, primary key(issue_id)
)
`);

app.get('/', function (req, res) {
  res.send(
      '<!doctype html><html><body><a href="/issues">issues</a><form action="/sync" method="POST"><button type="submit">SYNC</button></form></body></html>');
});

app.post('/sync', function (req, res) {
  axios.get('/issues.json').then(function (response) {
    return response.data.issues.map(function (issue) {
      return [issue['id'], issue['subject'], issue['description']];
    });
  }).then(function (issues) {
    connection.query(
        'replace into issues(issue_id, subject, description) values ?',
        [issues],
        function (error, results, fields) {
          console.log(results);
        }
    );
  }).then(function () {
    res.redirect('/');
  }).catch(function (e) {
    console.log(e);
  })
});

app.get('/issues', function (req, res) {
  connection.query('select * from issues', function (e, results, fields) {
    res.json(results);
  });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));