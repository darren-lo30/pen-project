-- DropForeignKey
ALTER TABLE "StrokeData" DROP CONSTRAINT "StrokeData_userId_fkey";

-- AlterTable
ALTER TABLE "StrokeData" ALTER COLUMN "userId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "StrokeData" ADD CONSTRAINT "StrokeData_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
