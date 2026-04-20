const { prisma } = require("../lib/prisma");

async function startSession(req, res) {
  try {
    const newSession = await prisma.gameSession.create({
      data: {},
    });

    return res.status(201).json({
      sesionId: newSession.id,
      message: "Session created successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
}

module.exports = { startSession };
