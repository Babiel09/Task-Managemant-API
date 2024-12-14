import { Body, Injectable } from "@nestjs/common";
import { PrismaClient, User } from "@prisma/client";

const pr = new PrismaClient();
const prisma = pr.user;

interface UserThings{
    id?:number;
    name?:string;
    email?:string;
    password?:string;
}


@Injectable()
export class UserService{
    async Insert(@Body() userData):Promise<User>{
        try{
            const postNewUser = await prisma.create({
                data:userData
            });
            console.log("A requisição para dar o Insert dentro do DB deu certo!");
            return postNewUser;
        } catch(err){
          {server:`Error during the Insert data to the DB! Error: ${err}`};
           console.error(`Rolou um erro no service do usuário!`);
           throw new Error(`A error happen when we try to Delete the user from the DB! Error: ${err}`);
        };
    };

    async SelectAll():Promise<User[]> {
        try{

            const mostraTudo = await prisma.findMany();
            return mostraTudo;
        } catch(err) {
            {server:`Error during the SelectAll operation: ${err.message || err}`};
            console.error("Erro ao recuperar usuários:", err);
            throw new Error(`Error during the SelectAll operation: ${err.message || err}`);
        };
    }

    async Delete({id}:UserThings):Promise<User>{
        try{
            const deletando = await prisma.delete({
                where:{
                    id:id
                }
            });

            if(!deletando){
                {server:`A GIANT ERROR!`};
                console.error("Deu um erro aqui!");
                throw new Error("A GIANT ERROR!");
            };

            return deletando;
        } catch(err){
            {server:`A error happen when we try to Delete the user from the DB! Error: ${err}`};
            console.error(`Rolou um erro no service do usuário!`);
            throw new Error(`A error happen when we try to Delete the user from the DB! Error: ${err}`);
        };
    };
};