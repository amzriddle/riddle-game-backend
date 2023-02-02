-- CreateTable
CREATE TABLE "ChallengeComplete" (
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER NOT NULL,
    "riddleId" INTEGER NOT NULL,

    CONSTRAINT "ChallengeComplete_pkey" PRIMARY KEY ("userId","riddleId")
);

-- AddForeignKey
ALTER TABLE "ChallengeComplete" ADD CONSTRAINT "ChallengeComplete_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChallengeComplete" ADD CONSTRAINT "ChallengeComplete_riddleId_fkey" FOREIGN KEY ("riddleId") REFERENCES "riddles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
