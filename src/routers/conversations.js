const express = require("express");
const router = express.Router();
const conversationsController = require("../controllers/conversations");

router.get("/:userId", conversationsController.conversations);
router.get("/:id/messages", conversationsController.conversation);

router.post("/", conversationsController.create);
// router.post("/message", conversationsController.send);

module.exports = router;
