/*
  Warnings:

  - A unique constraint covering the columns `[gameSessionId,characterId]` on the table `FoundCharacter` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "FoundCharacter_gameSessionId_characterId_key" ON "FoundCharacter"("gameSessionId", "characterId");
