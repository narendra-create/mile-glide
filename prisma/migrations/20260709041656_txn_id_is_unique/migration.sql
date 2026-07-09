/*
  Warnings:

  - A unique constraint covering the columns `[txn_number]` on the table `Paymentverification` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Paymentverification_txn_number_key" ON "Paymentverification"("txn_number");
