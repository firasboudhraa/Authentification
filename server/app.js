const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(express.json());
const corsOptions = {
    origin: 'http://localhost:5000', 
    credentials: true
  };
app.use(cors(corsOptions));

app.use("/user", require("./user/user.routes"));

module.exports = app;
