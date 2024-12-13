import { Body } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

export class UserService{
    private pr = new PrismaClient();
    private prisma = this.pr.user;

    async Insert(@Body() userData){
        try{
            const postNewUser = await this.prisma.create;
            console.log("A requisição para dar o Insert dentro do DB deu certo!");
            return postNewUser;
        } catch(err){
            return {server:`Error during the Insert data to the DB! Error: ${err}`};
        };
    };
};