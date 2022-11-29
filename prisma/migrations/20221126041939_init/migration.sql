/*
  Warnings:

  - You are about to drop the column `otherName` on the `employee` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "employee" DROP COLUMN "otherName",
ALTER COLUMN "contact" DROP NOT NULL;
