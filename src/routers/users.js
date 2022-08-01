const express = require("express");
const router = express.Router();
const validateAuthentication = require("../middleware/auth");
const {
  user,
  contacts,
  newContact,
  create,
  deleteContact,
} = require("../controllers/users");

router.get("/:id", validateAuthentication, user);
router.get("/:id/contacts", validateAuthentication, contacts);

router.post("/:id/contacts", validateAuthentication, newContact);
router.post("/", create);

router.patch("/:id/contacts", validateAuthentication, deleteContact);

module.exports = router;
