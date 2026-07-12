-- CreateEnum
CREATE TYPE "ActivityType" AS ENUM ('DELAY', 'PAYMENT', 'MILESTONEDONE', 'REMINDER');

-- CreateTable
CREATE TABLE "Activity" (
    "id" TEXT NOT NULL,
    "type" "ActivityType" NOT NULL,
    "dateTimeofMessage" TIMESTAMP(3) NOT NULL,
    "message" TEXT NOT NULL,
    "highlightmessage" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Activity_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Activity" ADD CONSTRAINT "Activity_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;
