-- AlterTable
ALTER TABLE "Appointment" ADD COLUMN "expert" TEXT;
ALTER TABLE "Appointment" ADD COLUMN "mode" TEXT;

-- AlterTable
ALTER TABLE "QuoteRequest" ADD COLUMN "attachmentName" TEXT;
ALTER TABLE "QuoteRequest" ADD COLUMN "attachmentPath" TEXT;
