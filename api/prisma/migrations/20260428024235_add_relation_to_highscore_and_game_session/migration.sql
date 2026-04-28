/*
  Warnings:

  - Added the required column `gameSessionId` to the `Highscore` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Highscore" ADD COLUMN     "gameSessionId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Highscore" ADD CONSTRAINT "Highscore_gameSessionId_fkey" FOREIGN KEY ("gameSessionId") REFERENCES "GameSession"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
