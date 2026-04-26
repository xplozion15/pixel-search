const express = require("express");
const highscoreRouter = express.Router();
const highscoreController = require("../controllers/highscore.controller.js");

highscoreRouter.get("/", highscoreController.getHighscores);
highscoreRouter.post("/", highscoreController.addHighscore);

module.exports = { highscoreRouter };
