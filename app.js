const express = require('express');
const app = express();
const port = 3000;
const axiosBase = require('axios');

const REDMINE_API_KEY = process.env.REDMINE_API_KEY;

const axios = axiosBase.create({
  baseURL: 'http://redmine:3000',
  headers: {
    'X-Redmine-API-Key': REDMINE_API_KEY
  }
});

app.get('/', function (req, res) {
  axios.get('/issues.json').then(function (response) {
    res.json(response.data);
  }).catch(function (e) {
    console.log(e);
    res.send('hellow');
  });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));