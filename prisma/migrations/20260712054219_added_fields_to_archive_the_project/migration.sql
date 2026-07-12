-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "archivedByClient" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "archivedByFreelancer" BOOLEAN NOT NULL DEFAULT false;
