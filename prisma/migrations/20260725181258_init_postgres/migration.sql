-- CreateEnum
CREATE TYPE "LeadStatus" AS ENUM ('NEW', 'IN_PROGRESS', 'DONE', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('CLIENT', 'PARTNER', 'ADMIN');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "emailVerified" TIMESTAMP(3),
    "image" TEXT,
    "passwordHash" TEXT,
    "role" "UserRole" NOT NULL DEFAULT 'CLIENT',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "sessionToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VerificationToken" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "CalendarConnection" (
    "id" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "accountEmail" TEXT,
    "accessToken" TEXT NOT NULL,
    "refreshToken" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CalendarConnection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Signature" (
    "id" TEXT NOT NULL,
    "quoteId" TEXT NOT NULL,
    "signerName" TEXT NOT NULL,
    "signerEmail" TEXT NOT NULL,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "signedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Signature_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContactMessage" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "company" TEXT,
    "subject" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "locale" TEXT NOT NULL DEFAULT 'fr',
    "status" "LeadStatus" NOT NULL DEFAULT 'NEW',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ContactMessage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QuoteRequest" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "company" TEXT,
    "country" TEXT,
    "service" TEXT NOT NULL,
    "budget" TEXT,
    "timeline" TEXT,
    "description" TEXT NOT NULL,
    "attachmentData" BYTEA,
    "attachmentName" TEXT,
    "attachmentMimeType" TEXT,
    "locale" TEXT NOT NULL DEFAULT 'fr',
    "status" "LeadStatus" NOT NULL DEFAULT 'NEW',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "QuoteRequest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Appointment" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "company" TEXT,
    "topic" TEXT NOT NULL,
    "expert" TEXT,
    "mode" TEXT,
    "date" TIMESTAMP(3) NOT NULL,
    "timeSlot" TEXT NOT NULL,
    "notes" TEXT,
    "locale" TEXT NOT NULL DEFAULT 'fr',
    "status" "LeadStatus" NOT NULL DEFAULT 'NEW',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Appointment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "JobApplication" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "position" TEXT NOT NULL,
    "portfolioUrl" TEXT,
    "linkedinUrl" TEXT,
    "message" TEXT,
    "locale" TEXT NOT NULL DEFAULT 'fr',
    "status" "LeadStatus" NOT NULL DEFAULT 'NEW',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "JobApplication_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PartnerRequest" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "company" TEXT NOT NULL,
    "country" TEXT,
    "partnerType" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "locale" TEXT NOT NULL DEFAULT 'fr',
    "status" "LeadStatus" NOT NULL DEFAULT 'NEW',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PartnerRequest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChatLead" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "message" TEXT NOT NULL,
    "page" TEXT,
    "locale" TEXT NOT NULL DEFAULT 'fr',
    "status" "LeadStatus" NOT NULL DEFAULT 'NEW',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ChatLead_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Account_provider_providerAccountId_key" ON "Account"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "Session"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_token_key" ON "VerificationToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_identifier_token_key" ON "VerificationToken"("identifier", "token");

-- CreateIndex
CREATE UNIQUE INDEX "Signature_quoteId_key" ON "Signature"("quoteId");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Signature" ADD CONSTRAINT "Signature_quoteId_fkey" FOREIGN KEY ("quoteId") REFERENCES "QuoteRequest"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
