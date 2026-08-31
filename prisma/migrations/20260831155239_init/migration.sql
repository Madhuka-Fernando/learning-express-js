-- CreateTable
CREATE TABLE "User" (
    "Id" SERIAL NOT NULL,
    "Name" TEXT NOT NULL,
    "UserName" TEXT NOT NULL,
    "Password" TEXT NOT NULL,
    "CreatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "UpdatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("Id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_UserName_key" ON "User"("UserName");
