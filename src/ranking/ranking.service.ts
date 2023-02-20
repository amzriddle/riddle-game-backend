import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Exclude } from "class-transformer";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class RankingService {
  constructor(private prisma: PrismaService, private config: ConfigService) {}

  async findRanking() {
    const rankingUnordered = await this.prisma.user.findMany({
      select: {
        id: true,
        email: true,
        _count: {
          select: {
            challengesComplete: true,
          },
        },
      },
    });

    const ranking = rankingUnordered.sort(
      (a, b) => b._count.challengesComplete - a._count.challengesComplete
    );

    return ranking;
  }
}
