const express = require("express");
const router = express.Router();
const usersController = require("../controllers/users");

router.get("/:id", usersController.user);
router.get("/:id/contacts", usersController.contacts);

router.post("/:id/contacts", usersController.newContact);
router.post("/", usersController.create);

router.patch("/:id/contacts", usersController.deleteContact);

module.exports = router;
