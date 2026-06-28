/*
  Warnings:

  - A unique constraint covering the columns `[projectcode]` on the table `Project` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "projectcode" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Project_projectcode_key" ON "Project"("projectcode");
