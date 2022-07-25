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

  userToCreate1.number = generateContactNumber();
  userToCreate2.number = generateContactNumber();

  const user1 = await userToCreate1.save();
  await userToCreate2.save();

  // contacts
  const contactToAdd = await User.findByNumber(userToCreate2.number);

  await user1.update({ newContactId: contactToAdd.id });

  process.exit(0);
}

seed()
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
  })
  .finally(() => process.exit(1));
