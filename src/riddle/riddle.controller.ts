import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { RiddleService } from './riddle.service';
import { CreateRiddleDto } from './dto/create-riddle.dto';
import { UpdateRiddleDto } from './dto/update-riddle.dto';
import { GetUser } from 'src/auth/decorator';
import { User } from '@prisma/client';
import { AuthGuard } from '@nestjs/passport';
import { TryAnswerDto } from './dto/try-answer.dto';

@Controller('riddle')
export class RiddleController {
  constructor(private readonly riddleService: RiddleService) {}

  @Post()
  create(@Body() createRiddleDto: CreateRiddleDto) {
    return this.riddleService.create(createRiddleDto);
  }

  @Get()
  findAll() {
    return this.riddleService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.riddleService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRiddleDto: UpdateRiddleDto) {
    return this.riddleService.update(+id, updateRiddleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.riddleService.remove(+id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('/answer/:id')
  answerRiddle(@Param('id') id: string, @GetUser() user: User, @Body() tryAnswerDto: TryAnswerDto) {
    return this.riddleService.answerRiddle(+id, user, tryAnswerDto);
  }
}
