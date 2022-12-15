import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";
import { PrismaService } from "./common/services/prisma.service";
import { DailyModule } from "./daily/daily.module";
import { UsersModule } from "./users/users.module";

@Module({
  imports: [DailyModule, AuthModule, UsersModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
