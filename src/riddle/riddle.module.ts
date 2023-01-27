import { Module } from '@nestjs/common';
import { RiddleService } from './riddle.service';
import { RiddleController } from './riddle.controller';

@Module({
  controllers: [RiddleController],
  providers: [RiddleService],
})
export class RiddleModule {}
