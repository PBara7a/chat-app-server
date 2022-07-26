const Message = require("../domain/message");
const { sendDataResponse, sendMessageResponse } = require("../utils/responses");

const create = async (req, res) => {
  const messageToCreate = await Message.fromJson(req.body);

  try {
    const createdMessage = await messageToCreate.save();

    return sendDataResponse(res, 200, createdMessage);
  } catch (e) {
    return sendMessageResponse(res, 500, e.message);
  }
};

const messages = async (req, res) => {
  const conversationId = Number(req.params.conversationId);

  try {
    const foundMessages = await Message.findAllFromConversation(conversationId);

    return sendDataResponse(res, 200, foundMessages);
  } catch (e) {
    return sendMessageResponse(res, 500, e.message);
  }
};

module.exports = { create, messages };
