/*
  Warnings:

  - A unique constraint covering the columns `[certificateHash]` on the table `Certification` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `certificateHash` to the `Certification` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
ALTER TYPE "GroupRole" ADD VALUE 'Instructor';

-- AlterTable
ALTER TABLE "Certification" ADD COLUMN     "certificateHash" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Payment" ADD COLUMN     "razorpayOrderId" TEXT,
ADD COLUMN     "razorpayPaymentId" TEXT,
ALTER COLUMN "currency" SET DEFAULT 'INR';

-- AlterTable
ALTER TABLE "Schedule" ADD COLUMN     "repeatFrequency" TEXT,
ADD COLUMN     "repeatUntil" TIMESTAMP(3);

-- CreateIndex
CREATE UNIQUE INDEX "Certification_certificateHash_key" ON "Certification"("certificateHash");
