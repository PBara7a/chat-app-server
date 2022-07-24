const express = require("express");
const router = express.Router();
const usersController = require("../controllers/users");

router.get("/:id", usersController.user);
router.post("/", usersController.create);

module.exports = router;
