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

io.on("connection", (socket) => {
  const number = socket.handshake.query.number;
  socket.join(number); // use later to send only to this number

  console.log(`User Connected: ${socket.id}`);

  socket.on("send-message", async (data, recipients) => {
    const messageToCreate = await Message.fromJson(data);

    try {
      await messageToCreate.save();
    } catch (e) {
      console.error(e);
    }

    socket.broadcast.emit("received-message");
  });
});

const port = process.env.PORT || 4000;
server.listen(port, () => {
  console.log(`[SERVER] listening on port ${port}`);
});
