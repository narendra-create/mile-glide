-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "clientEmail" TEXT,
ADD COLUMN     "deadline" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "description" TEXT;
