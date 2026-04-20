const express = require("express");
const characterRouter = express.Router();
const characterController = require("../controllers/character.controller");

characterRouter.get("/", characterController.getCharacters);

module.exports = { characterRouter };
