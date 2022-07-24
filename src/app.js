require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();

app.disable("x-powered-by");
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const authRouter = require("./routers/auth");
const usersRouter = require("./routers/users");
const contactsRouter = require("./routers/contacts");

app.use("/", authRouter);
app.use("/users", usersRouter);
app.use("/contacts", contactsRouter);

app.get("*", (req, res) => {
  res.status(404).json({
    status: "fail",
    data: {
      resource: "Not found",
    },
  });
});

module.exports = app;
