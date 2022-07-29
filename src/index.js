const http = require("http");
const app = require("./app");
const { Server } = require("socket.io");
const Message = require("./domain/message");

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

const contacts = {};

io.on("connection", (socket) => {
  const number = socket.handshake.query.number;

  socket.join(number);

  console.log(`User Connected: ${number}`);

  socket.on("user-connected", (number) => {
    contacts[number] = socket.id;
  });

  socket.on("send-message", async (data, recipients) => {
    const messageToCreate = await Message.fromJson(data);

    const conversationId = data.conversation_id;

    try {
      await messageToCreate.save();
    } catch (e) {
      console.error(e);
    }

    recipients.forEach((recipient) => {
      socket.to(contacts[recipient]).emit("received-message", conversationId);
    });
  });
});

const port = process.env.PORT || 4000;
server.listen(port, () => {
  console.log(`[SERVER] listening on port ${port}`);
});
