-- CreateTable
CREATE TABLE "CancellRequest" (
    "id" TEXT NOT NULL,
    "freelancerApproved" BOOLEAN NOT NULL DEFAULT false,
    "clientApproved" BOOLEAN NOT NULL DEFAULT false,
    "clientId" TEXT NOT NULL,
    "freelancerId" TEXT NOT NULL,
    "raiesdByuserId" TEXT NOT NULL,
    "acceptedById" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "projectId" TEXT NOT NULL,

    CONSTRAINT "CancellRequest_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "CancellRequest_freelancerId_freelancerApproved_clientId_cli_idx" ON "CancellRequest"("freelancerId", "freelancerApproved", "clientId", "clientApproved", "projectId");

-- AddForeignKey
ALTER TABLE "CancellRequest" ADD CONSTRAINT "CancellRequest_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Userprofile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CancellRequest" ADD CONSTRAINT "CancellRequest_freelancerId_fkey" FOREIGN KEY ("freelancerId") REFERENCES "Freelancer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CancellRequest" ADD CONSTRAINT "CancellRequest_raiesdByuserId_fkey" FOREIGN KEY ("raiesdByuserId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CancellRequest" ADD CONSTRAINT "CancellRequest_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
