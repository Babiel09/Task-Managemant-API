import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { TaskModule } from './task/task.module';
import { PrismaService } from 'prisma/prisma.service';
import { CpfModule } from './cpf/cpf.module';

@Module({
  imports: [UserModule, TaskModule, CpfModule],
  controllers:[],
  providers:[PrismaService],
})
export class AppModule {}
