import { Module } from "@nestjs/common";
import { TaskController } from "./task.controller";
import { TaskService } from "./task.service";
import { PrismaService } from "prisma/prisma.service";
import { AuthService2 } from "./auth/task.auth";
import { ConfigModule } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";

@Module({
    imports:[
        TaskModule,
        ConfigModule.forRoot(),
        JwtModule.register({
            secret:process.env.JWT_SECRET,
            signOptions:{
                expiresIn: process.env.EXPIRES
              }
        }),
    ],
    controllers:[TaskController],
    providers:[TaskService, PrismaService,AuthService2],
})
export class TaskModule{};