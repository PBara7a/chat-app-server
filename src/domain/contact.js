const dbClient = require("../utils/dbClient.js");

class Contact {
  static fromDb(contact) {
    return new Contact(
      contact.id,
      contact.userId,
      contact.name,
      contact.contactNum
    );
  }

  static async fromJson({ user_id, name, contact_number }) {
    return new Contact(null, user_id, name, contact_number);
  }

  constructor(id, userId, name, contactNum) {
    this.id = id;
    this.userId = userId;
    this.name = name;
    this.contactNum = contactNum;
  }

  toJSON() {
    return {
      id: this.id,
      user_id: this.userId,
      name: this.name,
      contact_number: this.contactNum,
    };
  }

  async save() {
    const createdContact = await dbClient.contact.create({
      data: {
        name: this.name,
        contactNum: this.contactNum,
        user: {
          connect: {
            id: this.userId,
          },
        },
      },
    });

    return Contact.fromDb(createdContact);
  }

  async update() {
    const updatedContact = await dbClient.contact.update({
      where: {
        id: this.id,
      },
      data: {
        userId: this.userId,
        name: this.name,
        contactNum: this.contactNum,
      },
    });

    return Contact.fromDb(updatedContact);
  }

  static async findById(id) {
    return Contact._findByUnique("id", id);
  }

  static async findAllFromUser(userId) {
    return Contact._findMany({ whereData: { userId } });
  }

  static async _findByUnique(key, value) {
    const foundContact = await dbClient.contact.findUnique({
      where: {
        [key]: value,
      },
    });

    if (foundContact) {
      return Contact.fromDb(foundContact);
    }

    return null;
  }

  static async _findMany({ whereData }) {
    const query = {
      where: { ...whereData },
    };

    const foundContacts = await dbClient.contact.findMany(query);

    return foundContacts.map((contact) => Contact.fromDb(contact));
  }
}

module.exports = Contact;
