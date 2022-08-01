const express = require("express");
const router = express.Router();
const validateAuthentication = require("../middleware/auth");
const { create, remove } = require("../controllers/messages");

router.post("/", validateAuthentication, create);

router.delete("/:id", validateAuthentication, remove);

module.exports = router;
