const http = require("http");
const app = require("./app");
const { Server } = require("socket.io");

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("chat-message", (data) => {
    socket.to(data.room).emit("received-message", data);
  });

  socket.on("join-room", (data) => {
    socket.join(data);
  });
});

const port = process.env.PORT || 4000;
server.listen(port, () => {
  console.log(`[SERVER] listening on port ${port}`);
});
