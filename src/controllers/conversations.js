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
  const userId = Number(req.params.userId);

  try {
    const foundConversations = await Conversation.findAllFromUser(userId);

    return sendDataResponse(res, 200, foundConversations);
  } catch (e) {
    return sendMessageResponse(res, 500, e.message);
  }
};

const conversation = async (req, res) => {
  const id = Number(req.params.id);

  try {
    const foundConversation = await Conversation.findById(id);

    return sendDataResponse(res, 200, foundConversation);
  } catch (e) {
    return sendMessageResponse(res, 500, e.message);
  }
};

module.exports = { create, conversations, conversation };
