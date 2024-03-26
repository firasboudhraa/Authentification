const {
  sendSuccessfulDeletion,
  sendSuccessfulUpdate,
  sendSuccessfulRead,
  sendSuccessfulCreation,
} = require("../lib/utility");

const UserModel = require("./user.model");
const jwt = require("../lib/jwt");

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
