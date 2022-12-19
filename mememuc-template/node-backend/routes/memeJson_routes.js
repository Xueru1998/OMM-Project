const express = require("express");
const memesController = require("../controllers/memes_controller");

const router = express.Router();
module.exports = router.get("/memesJson", memesController.getMemes);
