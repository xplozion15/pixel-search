const { json } = require("express");
const { prisma } = require("../lib/prisma");

async function getHighscores(req, res) {
  try {
    const highscores = await prisma.highscore.findMany({
      orderBy: {
        time: "asc",
      },
    });

    return res.status(200).json({
      message: "highscores fetched successfully",
      highscores: highscores,
    });
  } catch (error) {
    console.error(error);
    return (
      res.status(500),
      json({
        message: "Failed to fetch highscores",
      })
    );
  }
}

async function addHighscore(req, res) {
  try {
    const { time, playerName } = req.body;
    console.log(Number(time), playerName);
    await prisma.highscore.create({
      data: {
        time: Number(time),
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

// model Highscore {
//   id         Int    @id @default(autoincrement())
//   time       Int
//   playerName String
// }

module.exports = { addHighscore, getHighscores };
