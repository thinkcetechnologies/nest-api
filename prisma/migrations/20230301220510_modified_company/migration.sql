/*
  Warnings:

  - Added the required column `company_address` to the `company` table without a default value. This is not possible if the table is not empty.
  - Added the required column `company_size` to the `company` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "company" ADD COLUMN     "company_address" INTEGER NOT NULL,
ADD COLUMN     "company_size" INTEGER NOT NULL;
