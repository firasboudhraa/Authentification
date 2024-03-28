const express = require("express");
const userController = require("./user.controller");
const { errorWrapper } = require("../lib/errorHnadler");
const {
  generateAccessToken,
  authenticateToken,
  authenticateRefreshToken,
} = require("../lib/jwt");

const router = express.Router();

router.post("/sign-up-user", errorWrapper(userController.signUp));
router.post("/sign-in-user", errorWrapper(userController.signIn));
router.post(
  "/update-user",
  authenticateToken,
  errorWrapper(userController.updateOne)
);

router.post("/forgot-pass-user", errorWrapper(userController.forgotPass));
router.post('/reset-pass-user',errorWrapper(userController.resetPass));


module.exports = router;
