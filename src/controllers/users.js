const User = require("../domain/user");
const jwt = require("jsonwebtoken");
const { sendDataResponse, sendMessageResponse } = require("../utils/responses");
const { JWT_EXPIRY, JWT_SECRET } = require("../utils/config");

const create = async (req, res) => {
  const userToCreate = await User.fromJson(req.body);

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

function generateJwt(userId) {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: JWT_EXPIRY });
}

module.exports = {
  create,
};
