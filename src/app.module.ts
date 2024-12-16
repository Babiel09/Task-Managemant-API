import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ConfigModule } from "@nestjs/config";
import { JwtModule } from '@nestjs/jwt';
import  AuthService  from './user/auth/user.auth';

@Module({
  imports: [UserModule],
  controllers:[],
  providers:[],
})
export class AppModule {}
