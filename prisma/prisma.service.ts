import { Injectable } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

@Injectable()
export class PrismaService extends PrismaClient{
    constructor(){
        super(); //Pega todas as coisas do constructor do PrismaClient e joga pra esse service!
    };
};