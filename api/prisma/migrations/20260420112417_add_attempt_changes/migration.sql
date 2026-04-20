/*
  Warnings:

  - Added the required column `characterId` to the `Attempt` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isCorrect` to the `Attempt` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Attempt" ADD COLUMN     "characterId" INTEGER NOT NULL,
ADD COLUMN     "isCorrect" BOOLEAN NOT NULL;

-- AddForeignKey
ALTER TABLE "Attempt" ADD CONSTRAINT "Attempt_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "Character"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
