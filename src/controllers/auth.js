const User = require("../domain/user");
const bcrypt = require("bcrypt");
const generateJwt = require("../utils/generateJwt");
const {
  sendDataResponse,
  sendMessageResponse,
} = require("../utils/responses.js");

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return sendDataResponse(res, 401, {
      email: "Invalid email or/and password provided",
    });
  }

  try {
    const foundUser = await User.findByEmail(email);
    const areCredentialsValid = await validateCredentials(password, foundUser);

    if (!areCredentialsValid) {
      return sendDataResponse(res, 401, {
        email: "Invalid email and/or password provided",
      });
    }

    const token = generateJwt(foundUser.id);

    return sendDataResponse(res, 200, { token, ...foundUser.toJSON() });
  } catch (e) {
    return sendMessageResponse(res, 500, e.message);
  }
};

const validateCredentials = async (password, user) => {
  if (!user) return false;

  if (!password) return false;

  const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
  if (!isPasswordValid) return false;

  return true;
};

module.exports = { login };
