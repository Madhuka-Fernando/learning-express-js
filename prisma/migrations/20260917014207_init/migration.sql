-- CreateTable
CREATE TABLE "Session" (
    "Id" SERIAL NOT NULL,
    "Sid" TEXT NOT NULL,
    "Data" TEXT NOT NULL,
    "ExpiresAt" TIMESTAMP(3) NOT NULL,
    "CreatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "UpdatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("Id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Session_Sid_key" ON "Session"("Sid");
