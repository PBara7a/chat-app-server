const express = require("express");
const router = express.Router();
const contactsController = require("../controllers/contacts");

router.post("/", contactsController.createContact);

module.exports = router;
