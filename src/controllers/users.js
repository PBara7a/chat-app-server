const User = require("../domain/user");
const generateJwt = require("../utils/generateJwt");
const { sendDataResponse, sendMessageResponse } = require("../utils/responses");
const generateContactNumber = require("../utils/generateContactNumber");

const create = async (req, res) => {
  const userToCreate = await User.fromJson(req.body);
  userToCreate.number = generateContactNumber();

  try {
    const existingUser = await User.findByEmail(userToCreate.email);

    if (existingUser) {
      throw new Error("Email already in use");
    }

    const createdUser = await userToCreate.save();

    const token = generateJwt(createdUser.id);

    return sendDataResponse(res, 200, { token, ...createdUser.toJSON() });
  } catch (e) {
    return sendMessageResponse(res, 500, e.message);
  }
};

const user = async (req, res) => {
  const id = Number(req.params.id);

  const foundUser = await User.findById(id);

  if (!foundUser) {
    return sendMessageResponse(res, 400, "User does not exist");
  }

  return sendDataResponse(res, 200, foundUser);
};

module.exports = {
  create,
  user,
};
