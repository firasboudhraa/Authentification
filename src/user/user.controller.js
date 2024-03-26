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
 
  
  if (req.user.email !==req.body.email) {
    throw new Error("Unauthorized: You are not allowed to update this profile");
  }
    const updatedUser = await UserModel.updateOne(
      { email: req.body.email},
      req.body,
      { new: true }
    );

    return sendSuccessfulUpdate(res, updatedUser);

};
