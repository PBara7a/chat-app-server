const express = require("express");
const router = express.Router();
const validateAuthentication = require("../middleware/auth");
const { create, conversations } = require("../controllers/conversations");

router.get("/:userId", validateAuthentication, conversations);

router.post("/", validateAuthentication, create);

module.exports = router;
