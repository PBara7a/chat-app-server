const { sendDataResponse, sendMessageResponse } = require("../utils/responses");
const { JWT_SECRET } = require("../utils/config");
const jwt = require("jsonwebtoken");
const User = require("../domain/user");

const validateAuthentication = async (req, res, next) => {
  const header = req.header("authorization");

  if (!header) {
    return sendDataResponse(res, 401, {
      authorization: "Missing Authorization header",
    });
  }

  const [type, token] = header.split(" ");

  const isTypeValid = validateTokenType(type);
  if (!isTypeValid) {
    return sendDataResponse(res, 401, {
      authentication: `Invalid token type, expected Bearer but got ${type}`,
    });
  }

  const isTokenValid = validateToken(token);
  if (!isTokenValid) {
    return sendDataResponse(res, 401, {
      authentication: "Invalid or missing access token",
    });
  }

  const decodedToken = jwt.decode(token);
  const foundUser = await User.findById(decodedToken.userId);
  delete foundUser.passwordHash;

  req.user = foundUser;

  next();
};

const validateToken = (token) => {
  if (!token) return false;

  return jwt.verify(token, JWT_SECRET, (error) => {
    return !error;
  });
};

const validateTokenType = (type) => {
  if (!type) return false;

  if (type.toUpperCase() !== "BEARER") return false;

  return true;
};

module.exports = validateAuthentication;
