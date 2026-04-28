const { prisma } = require("../lib/prisma");
const { validationResult } = require("express-validator");

async function getHighscores(req, res) {
  try {
    const highscores = await prisma.highscore.findMany({
      take: 10,
      orderBy: {
        gameSession: {
          durationSeconds: "asc",
        },
      },
      include: {
        gameSession: true,
      },
    });

    return res.status(200).json({
      message: "highscores fetched successfully",
      highscores: highscores,
    });
  } catch (error) {
    console.error(error);
    return (
      res.status(500).json({
        message: "Failed to fetch highscores",
      })
    );
  }
}

async function addHighscore(req, res) {
  //validation
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: errors.array()[0].msg,
    });
  }

  //querying the db
  try {
    const { gameSessionId, playerName } = req.body;
    await prisma.highscore.create({
      data: {
        gameSessionId: gameSessionId,
        playerName: playerName,
      },
    });

    return res.status(201).json({
      message: "Highscore added successfuly",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Failed to add highscore",
      error: error.message,
    });
  }
}

module.exports = { addHighscore, getHighscores };
