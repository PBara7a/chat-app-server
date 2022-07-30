const User = require("../domain/user");
const generateJwt = require("../utils/generateJwt");
const { sendDataResponse, sendMessageResponse } = require("../utils/responses");
const generateContactNumber = require("../utils/generateContactNumber");
const formatContactDetails = require("../utils/formatContactDetails");

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

const newContact = async (req, res) => {
  const id = Number(req.params.id);
  const { number } = req.body;

  const contact = await User.findByNumber(number);

  if (!contact) {
    return sendMessageResponse(res, 500, "Invalid contact number");
  }

  try {
    const user = await User.findById(id);
    const userWithNewContact = await user.update({ newContactId: contact.id });

    return sendDataResponse(res, 200, userWithNewContact);
  } catch (e) {
    return sendMessageResponse(res, 500, e.message);
  }
};

const deleteContact = async (req, res) => {
  const id = Number(req.params.id);
  const { number } = req.body;

  const contact = await User.findByNumber(number);

  if (!contact) {
    return sendMessageResponse(res, 500, "Invalid contact number");
  }

  try {
    const user = await User.findById(id);
    const updatedUser = await user.update({
      deleteContactId: contact.id,
    });

    return sendDataResponse(res, 200, updatedUser);
  } catch (e) {
    return sendMessageResponse(res, 500, e.message);
  }
};

const contacts = async (req, res) => {
  const id = Number(req.params.id);

  const user = await User.findById(id);

  if (!user) {
    sendMessageResponse(res, 500, "Invalid user id");
  }

  const formattedContacts = user.contacts.map((contact) =>
    formatContactDetails(contact)
  );

  sendDataResponse(res, 200, formattedContacts);
};

module.exports = {
  create,
  user,
  newContact,
  contacts,
  deleteContact,
};
