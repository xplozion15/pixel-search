-- CreateTable
CREATE TABLE "GameSession" (
    "id" SERIAL NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "finishTime" TIMESTAMP(3),
    "durationSeconds" INTEGER,

    CONSTRAINT "GameSession_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FoundCharacter" (
    "id" SERIAL NOT NULL,
    "gameSessionId" INTEGER NOT NULL,
    "characterId" INTEGER NOT NULL,

    CONSTRAINT "FoundCharacter_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Highscore" (
    "id" SERIAL NOT NULL,
    "time" INTEGER NOT NULL,
    "playerName" TEXT NOT NULL,

    CONSTRAINT "Highscore_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Character" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "xTop" DOUBLE PRECISION NOT NULL,
    "xBottom" DOUBLE PRECISION NOT NULL,
    "yTop" DOUBLE PRECISION NOT NULL,
    "yBottom" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Character_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Attempt" (
    "id" SERIAL NOT NULL,
    "xtargetPoint" DOUBLE PRECISION NOT NULL,
    "ytargetPoint" DOUBLE PRECISION NOT NULL,
    "gameSessionId" INTEGER NOT NULL,

    CONSTRAINT "Attempt_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "FoundCharacter" ADD CONSTRAINT "FoundCharacter_gameSessionId_fkey" FOREIGN KEY ("gameSessionId") REFERENCES "GameSession"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FoundCharacter" ADD CONSTRAINT "FoundCharacter_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "Character"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attempt" ADD CONSTRAINT "Attempt_gameSessionId_fkey" FOREIGN KEY ("gameSessionId") REFERENCES "GameSession"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
