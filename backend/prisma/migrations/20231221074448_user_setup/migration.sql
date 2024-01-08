-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "preferencesId" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Preferences" (
    "id" TEXT NOT NULL,
    "storeData" BOOLEAN NOT NULL,

    CONSTRAINT "Preferences_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_preferencesId_key" ON "User"("preferencesId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_preferencesId_fkey" FOREIGN KEY ("preferencesId") REFERENCES "Preferences"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
