const User = require("../domain/user");

const generateContactNumber = () => {
  let number, userExists;

  do {
    number = Math.floor(Math.random() * 1000000000);
    userExists = User.findByNumber(number);
  } while (!userExists);

  return number;
};

module.exports = generateContactNumber;
