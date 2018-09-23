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
create table issues (
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

    const issues = response.data.issues;
    for (let i = 0, l = issues.length; i < l; i++) {
      const issue = issues[i];

      connection.query(
          'replace into issues(issue_id, subject, description) values(?)',
          {
            'issue_id': issue['id'],
            'subject': issue['subject'],
            'description': issue['description'],
          },
          function (error, results, fields) {
            console.log(error);
            console.log(results);
            console.log(fields);
          }
      );

    }

    res.redirect('/');
  }).catch(function (e) {
    console.log(e);
  });
});

app.get('/issues', function (req, res) {
  axios.get('/issues.json').then(function (response) {
    const issues = response.data.issues;
    res.json(issues);
  }).catch(function (e) {
    console.log(e);
  });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));