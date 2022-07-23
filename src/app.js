require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();

app.disable("x-powered-by");
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const authRouter = require("./routers/auth");
const userRouter = require("./routers/users");

app.use("/", authRouter);
app.use("/users", userRouter);

app.get("*", (req, res) => {
  res.status(404).json({
    status: "fail",
    data: {
      resource: "Not found",
    },
  });
});

module.exports = app;
