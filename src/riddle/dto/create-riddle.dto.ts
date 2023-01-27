import { IsNotEmpty, IsString } from 'class-validator';

export class CreateRiddleDto {
  @IsString()
  @IsNotEmpty()
  clue_1: string;

  @IsString()
  @IsNotEmpty()
  clue_2: string;

  @IsString()
  @IsNotEmpty()
  answer: string;
}
