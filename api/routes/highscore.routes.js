const express = require("express");
const highscoreRouter = express.Router();
const highscoreController = require("../controllers/highscore.controller.js");
const { validateUsername } = require("../validators/validator.js");

highscoreRouter.get("/", highscoreController.getHighscores);
highscoreRouter.post("/", validateUsername, highscoreController.addHighscore);

module.exports = { highscoreRouter };
