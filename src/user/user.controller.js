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

