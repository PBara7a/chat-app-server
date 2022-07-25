const express = require("express");
const router = express.Router();
const conversationsController = require("../controllers/conversations");

router.get("/:userId", conversationsController.conversations);
router.post("/", conversationsController.create);

module.exports = router;
