const { prisma } = require("../lib/prisma");
const { isAttemptCorrect } = require("../utils/attemptValidator");

async function startSession(req, res) {
  try {
    const newSession = await prisma.gameSession.create({
      data: {},
    });

    return res.status(201).json({
      sessionId: newSession.id,
      message: "Session created successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
}

async function createAttempt(req, res) {
  try {
    const { x, y, characterId } = req.body;
    const { gameSessionId } = req.params;
    const characterCoordinates = await prisma.character.findUnique({
      where: {
        id: Number(characterId),
      },
      select: {
        xLeft: true,
        xRight: true,
        yTop: true,
        yBottom: true,
      },
    });

    //check the attempt
    const checkAttempt = isAttemptCorrect(
      Number(x),
      Number(y),
      characterCoordinates,
    );

    //create the attempt on set true or false based on checked attempt function call above
    const newAttempt = await prisma.attempt.create({
      data: {
        xtargetPoint: Number(x),
        ytargetPoint: Number(y),
        characterId: Number(characterId),
        isCorrect: checkAttempt ? true : false,
        gameSessionId: Number(gameSessionId),
      },
    });

    // also add the character to found characters table in db for a particular sesssion if attempt was correct
    if (checkAttempt) {
      const newCharacterFound = await prisma.foundCharacter.create({
        data: {
          gameSessionId: Number(gameSessionId),
          characterId: Number(characterId),
        },
      });
    }

    // return status and json
    return res.status(200).json({
      message: checkAttempt ? "Correctly spotted" : "Not correct",
      isAttemptCorrect: checkAttempt,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
}


module.exports = { startSession, createAttempt };
