/*
  Warnings:

  - The values [ACITVE] on the enum `Projectstatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Projectstatus_new" AS ENUM ('COMPLETED', 'ACTIVE', 'PENDING', 'STOPPED', 'CANCELLED');
ALTER TABLE "Project" ALTER COLUMN "status" TYPE "Projectstatus_new" USING ("status"::text::"Projectstatus_new");
ALTER TYPE "Projectstatus" RENAME TO "Projectstatus_old";
ALTER TYPE "Projectstatus_new" RENAME TO "Projectstatus";
DROP TYPE "public"."Projectstatus_old";
COMMIT;
