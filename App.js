const express = require('express');
const app = express();

app.use(express.json());

app.use('/user', require('./src/user/user.routes'));

  

module.exports = app;