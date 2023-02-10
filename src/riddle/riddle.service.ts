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
    return this.prisma.riddle.findMany({
      select: {
        id: true
      },
      orderBy: {
        id: 'asc',
      },
    });
  }

  findOne(id: number) {
    return this.prisma.riddle.findUnique({
      where: { id: id },
      select: {
        id: true,
        clue_1: true,
        clue_2: true,
      },
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

  allAnsweredRiddle(user: User){
    return this.prisma.challengeComplete.findMany({
      where: {
        user: {
          id: {
            in: [user.id]
          }
        }
      },
      select: {
        riddleId: true,
      },
      orderBy: {
        riddleId: 'asc',
      },
    })
  }

  async nextRiddle(user: User){
    const lastAnswered = await this.prisma.challengeComplete.findFirst({
      where: {
        user: {
          id: {
            in: [user.id]
          }
        }
      },
      select: {
        riddleId: true,
      },
      orderBy: {
        riddleId: 'desc',
      },
    })

    const nextRiddle = await this.prisma.riddle.findFirst({
      where: {
        id: {
          gt: lastAnswered.riddleId
        }
      },
      select: {
        id: true
      },
      orderBy: {
        id: 'asc',
      },
    });

    return {
      lastAnswered: lastAnswered.riddleId, 
      nextRiddle: nextRiddle?    
        nextRiddle.id : 
        null
    }
  }  
}
