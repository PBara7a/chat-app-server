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

const remove = async (req, res) => {
  const id = Number(req.params.id);

  try {
    const foundMessage = await Message.findById(id);
    const deletedMessage = await foundMessage.delete();

    return sendDataResponse(res, 200, deletedMessage);
  } catch (e) {
    return sendMessageResponse(res, 500, e.message);
  }
};

module.exports = { create, remove };
