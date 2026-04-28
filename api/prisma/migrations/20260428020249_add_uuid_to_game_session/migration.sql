/*
  Warnings:

  - The primary key for the `GameSession` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "Attempt" DROP CONSTRAINT "Attempt_gameSessionId_fkey";

-- DropForeignKey
ALTER TABLE "FoundCharacter" DROP CONSTRAINT "FoundCharacter_gameSessionId_fkey";

-- AlterTable
ALTER TABLE "Attempt" ALTER COLUMN "gameSessionId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "FoundCharacter" ALTER COLUMN "gameSessionId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "GameSession" DROP CONSTRAINT "GameSession_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "GameSession_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "GameSession_id_seq";

-- AddForeignKey
ALTER TABLE "FoundCharacter" ADD CONSTRAINT "FoundCharacter_gameSessionId_fkey" FOREIGN KEY ("gameSessionId") REFERENCES "GameSession"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attempt" ADD CONSTRAINT "Attempt_gameSessionId_fkey" FOREIGN KEY ("gameSessionId") REFERENCES "GameSession"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
