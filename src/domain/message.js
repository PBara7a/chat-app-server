const dbClient = require("../utils/dbClient.js");
const crypto = require("../utils/crypto");

const password = process.env.PASSWORD;

class Message {
  static fromDb(message) {
    const decryptedMessage = crypto.decrypt(message.text, password);
    return new Message(
      message.id,
      message.senderId,
      message.conversationId,
      decryptedMessage
    );
  }

  static async fromJson({ sender_id, conversation_id, text }) {
    const encryptedText = crypto.encrypt(text, password);
    return new Message(null, sender_id, conversation_id, encryptedText);
  }

  constructor(id, senderId, conversationId, text) {
    this.id = id;
    this.senderId = senderId;
    this.conversationId = conversationId;
    this.text = text;
  }

  toJSON() {
    return {
      id: this.id,
      sender_id: this.senderId,
      conversation_id: this.conversationId,
      text: this.text,
    };
  }

  async save() {
    const createdMessage = await dbClient.message.create({
      data: {
        senderId: this.senderId,
        conversationId: this.conversationId,
        text: this.text,
      },
    });

    return Message.fromDb(createdMessage);
  }

  static async findById(id) {
    return Message._findByUnique("id", id);
  }

  static async findAllFromConversation(conversationId) {
    return Message._findMany({ whereData: { conversationId } });
  }

  static async _findByUnique(key, value) {
    const foundMessage = await dbClient.message.findUnique({
      where: {
        [key]: value,
      },
    });

    if (foundMessage) {
      return Message.fromDb(foundMessage);
    }

    return null;
  }

  static async _findMany({ whereData }) {
    const query = {
      where: { ...whereData },
    };

    const foundMessages = await dbClient.message.findMany(query);

    return foundMessages.map((message) => Message.fromDb(message));
  }
}

module.exports = Message;
