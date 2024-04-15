/*
  Warnings:

  - You are about to drop the column `name` on the `Cars` table. All the data in the column will be lost.
  - Changed the type of `year` on the `Cars` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Cars" DROP COLUMN "name",
DROP COLUMN "year",
ADD COLUMN     "year" INTEGER NOT NULL;
