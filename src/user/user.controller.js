const {
  sendSuccessfulDeletion,
  sendSuccessfulUpdate,
  sendSuccessfulRead,
  sendSuccessfulCreation,
} = require("../lib/utility");

const UserModel = require("./user.model");
const jwt = require("../lib/jwt");

exports.signUp = async (req, res) => {
  const CreatedUser = await UserModel.create(req.body);
  const accessToken = jwt.generateAccessToken({ email: req.body.email });
  return res.status(200).json({ accessToken });
};

exports.signIn = async (req, res) => {
  const { email, password } = req.body;

  const user = await UserModel.findOne({ email });

  if (!user) {
    throw new Error("Adresse e-mail ou mot de passe incorrect");
  }

  if (user.password !== password) {
    throw new Error("Adresse e-mail ou mot de passe incorrect");
  }

  return res.status(200).json({ success: true, message: "Connexion réussie" });
};

exports.updateOne = async (req, res) => {
  const user = await UserModel.findOne({ email: req.body.email });
  if (!user) throw new Error("NOT_FOUND");
  await UserModel.updateOne({ email: req.body.email }, req.body);
  return sendSuccessfulUpdate(res, user);
};
