const { getSessionDuration } = require("../utils/sessionDurationCalculator");
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

    let isSessionOver;

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
        gameSessionId: gameSessionId,
      },
    });

    // also add the character to found characters table in db for a particular sesssion if attempt was correct
    if (checkAttempt) {
      const newCharacterFound = await prisma.foundCharacter.create({
        data: {
          gameSessionId: gameSessionId,
          characterId: Number(characterId),
        },
      });
    }

    //check if the length of characters is equal to length of found characters which will signal that game is over
    const charactersLength = await prisma.character.count();
    const foundCharactersLength = await prisma.foundCharacter.count({
      where: {
        gameSessionId: gameSessionId,
      },
    });

    if (charactersLength === foundCharactersLength) {
      isSessionOver = true;
    } else {
      isSessionOver = false;
    }

    // return status and json
    return res.status(200).json({
      message: checkAttempt
        ? "You found the character"
        : "Not correct character",
      isAttemptCorrect: checkAttempt,
      isSessionOver: isSessionOver,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
}

async function updateSession(req, res) {
  const { gameSessionId } = req.params;

  //get session info to get the finish and start time to calculate and update the duration field
  const session = await prisma.gameSession.findUnique({
    where: {
      id: gameSessionId,
    },
  });

  //set start and finish time, and set the duration in seconds
  const finishTime = new Date().toISOString();
  const startTime = session.startTime;
  const durationSeconds = getSessionDuration(startTime, finishTime);

  //update the session with the calculate time (durationInSeconds);
  try {
    const updatedSession = await prisma.gameSession.update({
      where: {
        id: gameSessionId,
      },
      data: {
        finishTime: finishTime,
        durationSeconds: durationSeconds,
      },
    });

    // get the session data now
    const newlyUpdatedSession = await prisma.gameSession.findUnique({
      where: {
        id: gameSessionId,
      },
    });

    return res.status(200).json({
      message: "session updated successfully",
      updatedSession: newlyUpdatedSession,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Failed to update the session",
      error: error.message,
    });
  }
}

module.exports = { startSession, createAttempt, updateSession };
