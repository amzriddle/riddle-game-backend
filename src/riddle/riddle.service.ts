import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateRiddleDto } from './dto/create-riddle.dto';
import { UpdateRiddleDto } from './dto/update-riddle.dto';

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
}
