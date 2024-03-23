const {
    sendSuccessfulDeletion,
    sendSuccessfulUpdate,
    sendSuccessfulRead,
    sendSuccessfulCreation,
  } = require("../lib/utility");

const UserModel =  require ("./user.model");

exports.signUp = async (req , res) => {
    const CreatedUser = await UserModel.create(req.body);
    return sendSuccessfulCreation(res);
};

exports.signIn = async (req, res) => {
  const { email, password } = req.body;


      const user = await UserModel.findOne({ email });

      if (!user) {
          return res.status(401).json({ success: false, message: 'Adresse e-mail ou mot de passe incorrect' });
      }

      if (user.password !== password) {
          return res.status(401).json({ success: false, message: 'Adresse e-mail ou mot de passe incorrect' });
      }

      return res.status(200).json({ success: true, message: 'Connexion réussie' });

};

