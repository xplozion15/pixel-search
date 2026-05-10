const express = require("express");
const statusRouter = express.Router();
const statusController = require("../controllers/status.controller.js");

statusRouter.get("/", statusController.getStatus);

module.exports = { statusRouter };
