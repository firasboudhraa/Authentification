const { success } = require("../../lib/auth/res");
const UserModel = require("./user.model");
const jwt = require("../../lib/auth/jwt");
const nodemailer = require("nodemailer");
const { ERROR_CODES } = require("../../lib/error/errorCodes");

exports.signUp = async (req, res) => {
  const { email, userName, password, age, tel, adress } = req.body;
  const user = await UserModel.findOne({ email });
  if (user) throw new Error(ERROR_CODES.USER_ALREADY_EXISTS);

  await UserModel.create({
    email,
    userName,
    password,
    age,
    tel,
    adress,
  });
  const data = {
    accessToken: jwt.generateAccessToken({ email }),
    refreshToken: jwt.generateRefreshToken({ email }),
  };

  return success(res, data);
};

exports.signIn = async (req, res) => {
  const { loginEmail, loginPassword } = req.body;
  const user = await UserModel.findOne({ email: loginEmail });
  if (!user) throw new Error(ERROR_CODES.NOT_FOUND);

  if (user.password !== loginPassword) {
    throw new Error(ERROR_CODES.UNAUTHORIZED);
  }

  const data = {
    accessToken: jwt.generateAccessToken({ loginEmail }),
    refreshToken: jwt.generateRefreshToken({ loginEmail }),
  };

  return success(res, data);
};

exports.forgotPass = async (req, res) => {
  const { loginEmail } = req.body;

  try {
    const user = await UserModel.findOne({ email: loginEmail });

    if (!user) {
      throw new Error(ERROR_CODES.NOT_FOUND);
    }

    const transporter = nodemailer.createTransport({
      service: "Outlook",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const resetLink = "http://localhost:5000/reset-pass";

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: loginEmail,
      subject: "Password Reset",
      html: `Click the following link to reset your password: <a href="${resetLink}">${resetLink}</a>`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending password reset email:", error);
        return res
          .status(500)
          .json({ message: "Failed to send password reset email" });
      } else {
        console.log("Password reset email sent successfully:", info.response);
        return res
          .status(200)
          .json({ message: "Password reset email sent successfully" });
      }
    });
  } catch (error) {
    console.error("Error:", error);
    throw new Error(ERROR_CODES.INTERNAL_SERVER_ERROR);
  }
};

exports.resetPass = async (req, res) => {
  const { loginEmail, newPassword } = req.body;

  try {
    console.log("Updating password for email:", loginEmail);
    console.log("New password:", newPassword);

    const updatedUser = await UserModel.updateOne(
      { email: loginEmail },
      { password: newPassword },
      { new: true }
    );

    if (!updatedUser) {
      console.log("User not found or password not updated.");
      return res
        .status(404)
        .json({ message: "User not found or password not updated." });
    }

    console.log("Password reset successful.");
    return res.status(200).json({ message: "Password reset successful." });
  } catch (error) {
    console.error("Error:", error);
    throw new Error(ERROR_CODES.INTERNAL_SERVER_ERROR);
  }
};

exports.refreshToken = async (req, res) => {
  const { email } = req.user;
  const data = {
    accessToken: jwt.generateAccessToken({ email }),
    refreshToken: jwt.generateRefreshToken({ email }),
  };
  return success(res, data);
};
