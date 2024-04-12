const express = require("express");
const jwt = require("../../lib/auth/jwt");
const userController = require("./user.Controller");
const { errorWrapper } = require("../../lib/error/errorWrapper");

const router = express.Router();

router.post("/sign-up-user", errorWrapper(userController.signUp));
router.post("/sign-in-user", errorWrapper(userController.signIn));
router.get(
  "refresh",
  jwt.authenticateRefreshToken,
  errorWrapper(userController.refreshToken)
);

router.post("/forgot-pass-user", errorWrapper(userController.forgotPass));
router.post("/reset-pass-user", errorWrapper(userController.resetPass));

module.exports = router;
