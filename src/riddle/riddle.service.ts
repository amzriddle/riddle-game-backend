import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateRiddleDto } from './dto/create-riddle.dto';
import { UpdateRiddleDto } from './dto/update-riddle.dto';
import { User } from '@prisma/client';
import { TryAnswerDto } from './dto/try-answer.dto';

@Injectable()
export class RiddleService {
  constructor(private prisma: PrismaService, private config: ConfigService) {}
  async create(createRiddleDto: CreateRiddleDto) {
    try {
      const riddle = await this.prisma.riddle.create({
        data: createRiddleDto,
      });

      return riddle;
    } catch (error) {
      throw error;
    }
  }

  findAll() {
    return this.prisma.riddle.findMany();
  }

  findOne(id: number) {
    return this.prisma.riddle.findUnique({
      where: { id: id },
    });
  }

  async update(id: number, updateRiddleDto: UpdateRiddleDto) {
    return this.prisma.riddle.update({
      where: {
        id: id,
      },
      data: {
        ...updateRiddleDto,
      },
    });
  }

  remove(id: number) {
    return this.prisma.riddle.delete({
      where: {
        id: id,
      },
    });
  }

  async answerRiddle(id: number, user: User, tryAnswerDto: TryAnswerDto) {
    
    const riddle = await this.prisma.riddle.findUniqueOrThrow({
      where: {
        id: id
      }
    })

    // se resposta esta correta -> adiciona na tabela
    if(tryAnswerDto.answer.toLowerCase() === riddle.answer.toLowerCase()){
      const challengeComplete = await this.prisma.challengeComplete.create({
        data: {
          userId: user.id,
          riddleId: id,
        },
      });

      return challengeComplete;
    }
    throw new HttpException('Try again!', HttpStatus.OK);
  }
}
