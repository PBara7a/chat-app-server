const express = require("express");
const router = express.Router();
const contactsController = require("../controllers/contacts");

router.get("/:userId", contactsController.contacts);
router.post("/", contactsController.create);

module.exports = router;
