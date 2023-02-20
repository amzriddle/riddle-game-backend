import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";
import { UserModule } from "./user/user.module";
import { PrismaModule } from "./prisma/prisma.module";
import { ConfigModule } from "@nestjs/config";
import { RiddleModule } from "./riddle/riddle.module";
import { RankingModule } from "./ranking/ranking.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    UserModule,
    PrismaModule,
    RiddleModule,
    RankingModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
