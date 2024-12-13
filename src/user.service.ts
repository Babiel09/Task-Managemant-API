import { Body } from "@nestjs/common";
import { PrismaClient, User } from "@prisma/client";

const pr = new PrismaClient();
const prisma = pr.user;
export class UserService{
    async Insert(@Body() userData){
        try{
            const postNewUser = await prisma.create({
                data:userData
            });
            console.log("A requisição para dar o Insert dentro do DB deu certo!");
            return postNewUser;
        } catch(err){
            return {server:`Error during the Insert data to the DB! Error: ${err}`};
        };
    };

    async SelectAll():Promise<User[]> {
        try{

            const mostraTudo = await prisma.findMany();
            return mostraTudo;
        } catch(err) {
            console.error("Erro ao recuperar usuários:", err);
            throw new Error(`Error during the SelectAll operation: ${err.message || err}`);
        };
    }
};