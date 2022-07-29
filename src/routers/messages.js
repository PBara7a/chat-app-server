const express = require("express");
const router = express.Router();
const messagesController = require("../controllers/messages");

router.get("/:conversationId", messagesController.messages);

router.post("/", messagesController.create);

router.delete("/:id", messagesController.remove);

module.exports = router;
