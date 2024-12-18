import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { ConfigModule } from "@nestjs/config";
import { JwtModule } from '@nestjs/jwt';
import  AuthService  from './auth/user.auth';
import { PrismaService } from "../../prisma/prisma.service";
import { CpfModule } from "src/cpf/cpf.module";
import { CpfValidator } from "src/cpf/cpf.service";

@Module({
    imports: [
        UserModule,
        CpfModule,
        ConfigModule.forRoot(),
        JwtModule.register({
          secret:process.env.JWT_SECRET,
          signOptions:{
            expiresIn: process.env.EXPIRES
          }
        }),
      ],
    controllers:[UserController],
    providers:[UserService,AuthService,PrismaService, CpfValidator],
})

export class UserModule{};