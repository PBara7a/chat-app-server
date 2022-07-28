const crypto = require("crypto");
const config = require("./cryptoConfig");

const encrypt = (text) => {
  const cipher = crypto.createCipheriv(
    "aes-256-cbc",
    config.cryptkey,
    config.iv
  );

  return Buffer.concat([cipher.update(text), cipher.final()]).toString(
    "base64"
  );
};

const decrypt = (text) => {
  if (text === null || typeof text === "undefined" || text === "") {
    return text;
  }

  const decipher = crypto.createDecipheriv(
    "aes-256-cbc",
    config.cryptkey,
    config.iv
  );

  return Buffer.concat([
    decipher.update(text, "base64"),
    decipher.final(),
  ]).toString();
};

module.exports = { encrypt, decrypt };
