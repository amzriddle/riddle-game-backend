import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Exclude } from "class-transformer";
import { PrismaService } from "src/prisma/prisma.service";

function toJson(data) {
  return JSON.stringify(data, (_, v) =>
    typeof v === "bigint" ? `${v}n` : v
  ).replace(/"(-?\d+)n"/g, (_, a) => a);
}

@Injectable()
export class RankingService {
  constructor(private prisma: PrismaService, private config: ConfigService) {}

  async findRanking(query) {
    const limit = 5;
    const offset = (query.page - 1) * limit;

    const ranking = await this.prisma.$queryRaw`
      SELECT 
        users.email, 
        COUNT("ChallengeComplete"."riddleId") AS "completeChallengesCount",
        RANK() OVER (ORDER BY COUNT("ChallengeComplete"."riddleId") DESC)
      FROM "users"
      RIGHT JOIN "ChallengeComplete" 
      ON "users"."id" = "ChallengeComplete"."userId"
      GROUP BY users.id
      LIMIT ${limit}
      OFFSET ${offset}
    `;

    return toJson(ranking);
  }
}
