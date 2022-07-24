const Contact = require("../domain/contact");
const { sendDataResponse, sendMessageResponse } = require("../utils/responses");

const contacts = async (req, res) => {
  const { userId } = req.params;

  try {
    const foundContacts = await Contact.findAllFromUser(Number(userId));

    return sendDataResponse(res, 200, foundContacts);
  } catch (e) {
    return sendMessageResponse(res, 500, e.message);
  }
};

const createContact = async (req, res) => {
  const contactToCreate = await Contact.fromJson(req.body);

  try {
    const createdContact = await contactToCreate.save();

    return sendDataResponse(res, 200, createdContact);
  } catch (e) {
    return sendMessageResponse(res, 500, e.message);
  }
};

module.exports = { createContact, contacts };
