const Conversation = require("../src/domain/conversation");
const Message = require("../src/domain/message");
const User = require("../src/domain/user");
const generateContactNumber = require("../src/utils/generateContactNumber");

async function seed() {
  //users
  const userToCreate1 = await User.fromJson({
    first_name: "Paulo",
    last_name: "Barata",
    email: "test@test.com",
    password: "test1",
  });

  const userToCreate2 = await User.fromJson({
    first_name: "Oscar",
    last_name: "Badjoras",
    email: "test1@test.com",
    password: "test1",
  });

  const userToCreate3 = await User.fromJson({
    first_name: "Bob",
    last_name: "Pattel",
    email: "test2@test.com",
    password: "test1",
  });

  userToCreate1.number = generateContactNumber();
  userToCreate2.number = generateContactNumber();
  userToCreate3.number = generateContactNumber();

  const user1 = await userToCreate1.save();
  const user2 = await userToCreate2.save();
  const user3 = await userToCreate3.save();

  // contacts
  const contactToAdd1 = await User.findByNumber(userToCreate2.number);
  const contactToAdd2 = await User.findByNumber(userToCreate3.number);

  await user1.update({ newContactId: contactToAdd1.id });
  await user1.update({ newContactId: contactToAdd2.id });

  // conversations
  const conversationToCreate = new Conversation(null, user1.id, "Group chat", [
    user1.id,
    2,
    3,
  ]);

  const conversation = await conversationToCreate.save();

  // messages
  const messageToCreate1 = new Message(
    null,
    1,
    1,
    "VTJGc2RHVmtYMSt3TmhJU21TNlZoOWkzQXhkZm5mcEFOSVZ4SEFvOUY2dz0="
  );
  const messageToCreate2 = new Message(
    null,
    2,
    1,
    "VTJGc2RHVmtYMTkyYVZMTnI1djlRaGg4eUs0c3BlYUlaWVFVdFA5TGRyaC80QkNWLzFZSzVDM0dEZkRYdjd1MQ=="
  );
  const messageToCreate3 = new Message(
    null,
    1,
    1,
    "VTJGc2RHVmtYMS92YXJXV3NJL2MwUUVTa0RiWHdZUS9CQ2JWZUQ5UXBROD0="
  );

  const message1 = await messageToCreate1.save();
  const message2 = await messageToCreate2.save();
  const message3 = await messageToCreate3.save();

  process.exit(0);
}

seed()
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
  })
  .finally(() => process.exit(1));
