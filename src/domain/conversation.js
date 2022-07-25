const dbClient = require("../utils/dbClient.js");

class Conversation {
  static fromDb(conversation) {
    return new Conversation(
      conversation.id,
      conversation.ownerId,
      conversation.name,
      conversation.participants
    );
  }

  static async fromJson({ owner_id, name, participants }) {
    return new Conversation(null, owner_id, name, participants);
  }

  constructor(id, ownerId, name, participants) {
    this.id = id;
    this.ownerId = ownerId;
    this.name = name;
    this.participants = participants;
  }

  toJSON() {
    return {
      id: this.id,
      owner_id: this.ownerId,
      name: this.name,
      participants: this.participants,
    };
  }

  async save() {
    const participantsArr = this.participants.map((id) => ({ id: id }));

    const createdConversation = await dbClient.conversation.create({
      data: {
        name: this.name,
        ownerId: this.ownerId,
        participants: {
          connect: participantsArr,
        },
      },
    });

    return Conversation.fromDb(createdConversation);
  }

  static async findById(id) {
    return Conversation._findByUnique("id", id);
  }

  static async findAllFromUser(userId) {
    return Conversation._findMany({ whereData: { ownerId: userId } });
  }

  static async _findByUnique(key, value) {
    const foundConversation = await dbClient.conversation.findUnique({
      where: {
        [key]: value,
      },
    });

    if (foundConversation) {
      return Conversation.fromDb(foundConversation);
    }

    return null;
  }

  static async _findMany({ whereData }) {
    const query = {
      where: { ...whereData },
      include: {
        participants: true,
      },
    };

    const foundConversations = await dbClient.conversation.findMany(query);

    return foundConversations.map((conversation) =>
      Conversation.fromDb(conversation)
    );
  }
}

module.exports = Conversation;