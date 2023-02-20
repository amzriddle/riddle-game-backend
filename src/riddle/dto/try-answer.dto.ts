import { IsAlphanumeric, IsNotEmpty, IsString } from "class-validator";

export class TryAnswerDto {
  @IsString()
  @IsNotEmpty()
  answer: string;
}
