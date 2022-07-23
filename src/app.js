require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();

app.disable("x-powered-by");
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const userRouter = require("./routers/users");

app.use("/users", userRouter);

module.exports = app;
