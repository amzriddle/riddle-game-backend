import { IsInt } from "class-validator";
import { Type } from "class-transformer";

export class RankingPageDto {
  @IsInt()
  @Type(() => Number)
  page: number;
}
