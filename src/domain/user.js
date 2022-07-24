const dbClient = require("../utils/dbClient.js");
const bcrypt = require("bcrypt");

class User {
  static fromDb(user) {
    return new User(
      user.id,
      user.profile.firstName,
      user.profile.lastName,
      user.email,
      user.password,
      user.number
    );
  }

  static async fromJson({ first_name, last_name, email, password }) {
    let passwordHash;
    if (password) {
      passwordHash = await bcrypt.hash(password, 8);
    }

    return new User(null, first_name, last_name, email, passwordHash);
  }

  constructor(id, firstName, lastName, email, passwordHash, number) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.passwordHash = passwordHash;
    this.number = number;
  }

  toJSON() {
    return {
      user: {
        id: this.id,
        first_name: this.firstName,
        last_name: this.lastName,
        email: this.email,
        number: this.number,
      },
    };
  }

  async save() {
    const createdUser = await dbClient.user.create({
      data: {
        email: this.email,
        password: this.passwordHash,
        number: this.number,
        profile: {
          create: {
            firstName: this.firstName,
            lastName: this.lastName,
          },
        },
      },
      include: {
        profile: true,
      },
    });

    return User.fromDb(createdUser);
  }

  async update() {
    const updatedUser = await dbClient.user.update({
      where: {
        id: this.id,
      },
      data: {
        email: this.email,
        password: this.passwordHash,
        number: this.number,
        profile: {
          update: {
            firstName: this.firstName,
            lastName: this.lastName,
          },
        },
      },
      include: {
        profile: true,
      },
    });

    return User.fromDb(updatedUser);
  }

  static async findByEmail(email) {
    return User._findByUnique("email", email);
  }

  static async findByNumber(number) {
    return User._findByUnique("number", number);
  }

  static async findById(id) {
    return User._findByUnique("id", id);
  }

  static async findAll({ whereData }) {
    return User._findMany({ whereData });
  }

  static async _findByUnique(key, value) {
    const foundUser = await dbClient.user.findUnique({
      where: {
        [key]: value,
      },
      include: {
        profile: true,
      },
    });

    if (foundUser) {
      return User.fromDb(foundUser);
    }

    return null;
  }

  static async _findMany({ key, value, whereData }) {
    const query = {
      where: { ...whereData },
      include: {
        profile: true,
      },
    };

    if (key !== undefined && value !== undefined) {
      query.where = {
        profile: {
          [key]: value,
        },
      };
    }

    const foundUsers = await dbClient.user.findMany(query);

    return foundUsers.map((user) => User.fromDb(user));
  }
}

module.exports = User;
