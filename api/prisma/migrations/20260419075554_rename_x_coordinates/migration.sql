/*
  Warnings:

  - You are about to drop the column `xBottom` on the `Character` table. All the data in the column will be lost.
  - You are about to drop the column `xTop` on the `Character` table. All the data in the column will be lost.
  - Added the required column `xLeft` to the `Character` table without a default value. This is not possible if the table is not empty.
  - Added the required column `xRight` to the `Character` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Character" DROP COLUMN "xBottom",
DROP COLUMN "xTop",
ADD COLUMN     "xLeft" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "xRight" DOUBLE PRECISION NOT NULL;
