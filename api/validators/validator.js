const { body } = require("express-validator");

const validateUsername = [
  body("playerName")
    .trim()
    .notEmpty()
    .withMessage("Username cannot be empty")
    .isLength({ min: 1, max: 15 })
    .withMessage("Please enter a shorter username (max 15 characteres)"),
];

module.exports = { validateUsername };
