const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

app.use('/user', require('./src/user/user.routes'));

  

module.exports = app;