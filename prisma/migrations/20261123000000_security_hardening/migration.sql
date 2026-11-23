-- AlterTable
ALTER TABLE "Signature" ADD COLUMN     "consentText" TEXT,
ADD COLUMN     "documentHash" TEXT,
ADD COLUMN     "locale" TEXT,
ADD COLUMN     "proposalVersion" INTEGER,
ADD COLUMN     "snapshot" JSONB;

-- AlterTable
ALTER TABLE "QuoteRequest" ADD COLUMN     "proposal" JSONB,
ADD COLUMN     "proposalSentAt" TIMESTAMP(3),
ADD COLUMN     "proposalVersion" INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "QuoteSignToken" (
    "id" TEXT NOT NULL,
    "quoteId" TEXT NOT NULL,
    "tokenHash" TEXT NOT NULL,
    "proposalVersion" INTEGER NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "usedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "QuoteSignToken_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RateLimitHit" (
    "id" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RateLimitHit_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "QuoteSignToken_tokenHash_key" ON "QuoteSignToken"("tokenHash");

-- CreateIndex
CREATE INDEX "QuoteSignToken_quoteId_idx" ON "QuoteSignToken"("quoteId");

-- CreateIndex
CREATE INDEX "RateLimitHit_key_createdAt_idx" ON "RateLimitHit"("key", "createdAt");

-- CreateIndex
CREATE INDEX "ContactMessage_email_idx" ON "ContactMessage"("email");

-- CreateIndex
CREATE INDEX "QuoteRequest_email_idx" ON "QuoteRequest"("email");

-- CreateIndex
CREATE INDEX "Appointment_email_idx" ON "Appointment"("email");

-- CreateIndex
CREATE INDEX "Appointment_date_timeSlot_idx" ON "Appointment"("date", "timeSlot");

-- CreateIndex
CREATE INDEX "JobApplication_email_idx" ON "JobApplication"("email");

-- CreateIndex
CREATE INDEX "PartnerRequest_email_idx" ON "PartnerRequest"("email");

-- AddForeignKey
ALTER TABLE "QuoteSignToken" ADD CONSTRAINT "QuoteSignToken_quoteId_fkey" FOREIGN KEY ("quoteId") REFERENCES "QuoteRequest"("id") ON DELETE CASCADE ON UPDATE CASCADE;

