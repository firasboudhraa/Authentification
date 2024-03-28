const express = require('express');
const cors = require('cors');
const path = require('path'); 

const app = express();

app.use(express.json());
app.use(cors());

app.use(express.static(path.join(__dirname,'frontend')));


app.get('/resetPass/resetPass.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'resetPass', 'resetPass.html'));
});

app.use('/user', require('./src/user/user.routes'));

  

module.exports = app;