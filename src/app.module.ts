import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { TaskModule } from './task/task.module';
import { PrismaService } from 'prisma/prisma.service';

@Module({
  imports: [UserModule, TaskModule],
  controllers:[],
  providers:[PrismaService],
})
export class AppModule {}
