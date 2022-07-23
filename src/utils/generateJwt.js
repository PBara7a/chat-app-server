const jwt = require("jsonwebtoken");
const { JWT_EXPIRY, JWT_SECRET } = require("./config");

const generateJwt = (userId) => {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: JWT_EXPIRY });
};

module.exports = generateJwt;
