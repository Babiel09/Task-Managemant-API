import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { ConfigModule } from "@nestjs/config";
import { JwtModule } from '@nestjs/jwt';
import  AuthService  from './auth/user.auth';
import { PrismaService } from "../../prisma/prisma.service";

@Module({
    imports: [
        UserModule,
        ConfigModule.forRoot(),
        JwtModule.register({
          secret:process.env.JWT_SECRET,
          signOptions:{
            expiresIn: process.env.EXPIRES
          }
        }),
      ],
    controllers:[UserController],
    providers:[UserService,AuthService,PrismaService],
})

export class UserModule{};