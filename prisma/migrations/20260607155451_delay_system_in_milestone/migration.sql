/*
  Warnings:

  - Added the required column `deadline` to the `Milestone` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Milestone" ADD COLUMN     "deadline" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "delay" BOOLEAN,
ADD COLUMN     "delayreason" TEXT;
