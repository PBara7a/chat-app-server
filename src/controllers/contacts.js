const User = require("../domain/user");
const Contact = require("../domain/contact");
const { sendDataResponse, sendMessageResponse } = require("../utils/responses");

const createContact = async (req, res) => {
  const contactToCreate = await Contact.fromJson(req.body);

  try {
    const createdContact = await contactToCreate.save();

    return sendDataResponse(res, 200, createdContact);
  } catch (e) {
    return sendMessageResponse(res, 500, e.message);
  }
};

module.exports = { createContact };
