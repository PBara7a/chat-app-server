const Conversation = require("../domain/conversation");
const { sendDataResponse, sendMessageResponse } = require("../utils/responses");

const create = async (req, res) => {
  const conversationToCreate = await Conversation.fromJson(req.body);

  try {
    const createdConversation = await conversationToCreate.save();

    return sendDataResponse(res, 200, createdConversation);
  } catch (e) {
    return sendMessageResponse(res, 500, e.message);
  }
};

const conversations = async (req, res) => {
  const { id } = req.user;

  try {
    const foundConversations = await Conversation.findAllFromUser(id);

    return sendDataResponse(res, 200, foundConversations);
  } catch (e) {
    return sendMessageResponse(res, 500, e.message);
  }
};

module.exports = { create, conversations };
