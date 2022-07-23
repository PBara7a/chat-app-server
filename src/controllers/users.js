const User = require("../domain/user");

const create = async (req, res) => {
  const userToCreate = await User.fromJson(req.body);

  try {
    const existingUser = await User.findByEmail(userToCreate.email);

    if (existingUser) {
      throw new Error("Email already in use");
    }

    const createdUser = await userToCreate.save();

    res.json(createdUser.toJSON());
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

module.exports = {
  create,
};
