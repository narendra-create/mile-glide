-- CreateTable
CREATE TABLE "Milestonedelay" (
    "id" TEXT NOT NULL,
    "milestoneId" TEXT NOT NULL,
    "newDeadline" TIMESTAMP(3) NOT NULL,
    "oldDeadline" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Milestonedelay_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Milestonedelay" ADD CONSTRAINT "Milestonedelay_milestoneId_fkey" FOREIGN KEY ("milestoneId") REFERENCES "Milestone"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
