const express = require("express");
const userController = require("./user.controller");
const  {errorWrapper } = require ("../lib/errorHnadler");



const router = express.Router();

router.post("/sign-up-user", errorWrapper(userController.signUp));
router.post("/sign-in-user", errorWrapper(userController.signIn));


module.exports = router;