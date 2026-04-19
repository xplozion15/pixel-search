const express = require("express");
const gameController = require("../controllers/gameController.js");
const gameRouter = express.Router();

gameRouter.post("/", gameController.startSession);

module.exports = { gameRouter };
