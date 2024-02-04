-- CreateTable
CREATE TABLE "Canvas" (
    "id" TEXT NOT NULL,

    CONSTRAINT "Canvas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StrokeData" (
    "id" TEXT NOT NULL,
    "strokePath" JSONB NOT NULL,
    "userId" TEXT NOT NULL,
    "canvasId" TEXT NOT NULL,

    CONSTRAINT "StrokeData_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "StrokeData" ADD CONSTRAINT "StrokeData_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StrokeData" ADD CONSTRAINT "StrokeData_canvasId_fkey" FOREIGN KEY ("canvasId") REFERENCES "Canvas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
