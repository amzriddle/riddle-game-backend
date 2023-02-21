import { Controller, Get, Query } from "@nestjs/common";
import { RankingService } from "./ranking.service";
import { RankingPageDto } from "./dto/ranking-page.dto";

@Controller("ranking")
export class RankingController {
  constructor(private readonly rankingService: RankingService) {}

  @Get("")
  findRanking(@Query() query: RankingPageDto) {
    return this.rankingService.findRanking(query);
  }
}
