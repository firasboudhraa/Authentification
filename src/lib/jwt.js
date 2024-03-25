const jwt = require("jsonwebtoken");
require("dotenv").config();
const {
  errorWrapper,
} = require('./errorHnadler');

exports.generateAccessToken = (user) =>
  jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: process.env.ACCESS_TOKEN_DURATION,
  });
  

exports.generateRefreshToken = (user) =>
  jwt.sign(user, process.env.ACCESS_TOKEN_SECRET_REFRESH, {
    expiresIn: process.env.REFRESH_TOKEN_DURATION,
  });

exports.authenticateToken = errorWrapper((req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) throw new Error("UNAUTHENTICATED");
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) throw new Error("UNAUTHORIZED");
    req.user = user;
    next();
  });
});

exports.authenticateRefreshToken = errorWrapper((req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) throw new Error("UNAUTHENTICATED");
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_REFRESH, (err, user) => {
    if (err) throw new Error("UNAUTHORIZED");
    req.user = user;
    next();
  });
});
