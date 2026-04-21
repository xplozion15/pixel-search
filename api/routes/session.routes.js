const express = require("express");
const sessionController = require("../controllers/session.controller.js");
const sessionRouter = express.Router();

sessionRouter.post("/", sessionController.startSession);
sessionRouter.post("/:gameSessionId/attempts", sessionController.createAttempt);

module.exports = { sessionRouter };
