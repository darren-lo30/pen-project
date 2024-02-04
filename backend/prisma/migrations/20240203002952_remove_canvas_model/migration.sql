/*
  Warnings:

  - You are about to drop the `Canvas` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "StrokeData" DROP CONSTRAINT "StrokeData_canvasId_fkey";

-- DropTable
DROP TABLE "Canvas";
