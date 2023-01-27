-- CreateTable
CREATE TABLE "riddles" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "clue_1" TEXT NOT NULL,
    "clue_2" TEXT,
    "answer" TEXT NOT NULL,

    CONSTRAINT "riddles_pkey" PRIMARY KEY ("id")
);
