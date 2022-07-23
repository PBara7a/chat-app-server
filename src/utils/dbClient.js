const prisma = require("@prisma/client");

const dbClient = new prisma.PrismaClient();

module.exports = dbClient;
