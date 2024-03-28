const {
  sendSuccessfulDeletion,
  sendSuccessfulUpdate,
  sendSuccessfulRead,
  sendSuccessfulCreation,
} = require("../lib/utility");

const UserModel = require("./user.model");
const jwt = require("../lib/jwt");
const nodemailer = require("nodemailer");

exports.signUp = async (req, res) => {
  const { email, userName, password, age, tel, adress } = req.body;
  try {
    const newUser = await UserModel.create({
      email,
      userName,
      password,
      age,
      tel,
      adress,
    });
    const accessToken = jwt.generateAccessToken({ email: newUser.email });
    return res.status(200).json({ accessToken });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.signIn = async (req, res) => {
  const { loginEmail, loginPassword } = req.body;

  try {
    const user = await UserModel.findOne({ email: loginEmail });

    if (!user || user.password !== loginPassword) {
      throw new Error("Invalid email or password");
    }

    return res
      .status(200)
      .json({ success: true, message: "Connexion réussie !" });
  } catch (error) {
    throw new Error("Internal Server Error");
  }
};

exports.updateOne = async (req, res) => {
  if (req.user.email !== req.body.email) {
    throw new Error("Unauthorized: You are not allowed to update this profile");
  }
  const updatedUser = await UserModel.updateOne(
    { email: req.body.email },
    req.body,
    { new: true }
  );

  return sendSuccessfulUpdate(res, updatedUser);
};

/*exports.forgotPass = async (req, res) => {
  const { email } = req.body;

  try {
      const user = await UserModel.findOne({ email });

      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }

      return res.status(200).json({ message: 'Password reset email sent successfully' });
  } catch (error) {
      console.error('Error:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
  }
};*/

exports.forgotPass = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const transporter = nodemailer.createTransport({
      service: 'Outlook',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const resetLink = 'http://127.0.0.1:3000/resetPass/resetPass.html';

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email, 
      subject: 'Password Reset',
      html: `Click the following link to reset your password: <a href="${resetLink}">${resetLink}</a>`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending password reset email:', error);
        return res.status(500).json({ message: 'Failed to send password reset email' });
      } else {
        console.log('Password reset email sent successfully:', info.response);
        return res.status(200).json({ message: 'Password reset email sent successfully' });
      }
    });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};



exports.resetPass = async (req, res) => {
  const { loginEmail, newPassword } = req.body;

  try {
    console.log('Updating password for email:', loginEmail);
    console.log('New password:', newPassword);

    const updatedUser = await UserModel.updateOne(
      { email: loginEmail },
      { password: newPassword },
      { new: true } 
    );

    if (!updatedUser) {
      console.log('User not found or password not updated.');
      return res.status(404).json({ message: 'User not found or password not updated.' });
    }

    console.log('Password reset successful.');
    return res.status(200).json({ message: 'Password reset successful.' });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};