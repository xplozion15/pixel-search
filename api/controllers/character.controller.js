const { prisma } = require("../lib/prisma");

async function getCharacters(req, res) {
  try {
    const characters = await prisma.character.findMany();

    return res.status(200).json({
      characters: characters,
      message: "Characters fetched successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to fetch the characters",
    });
  }
}

module.exports = { getCharacters };
