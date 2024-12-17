import { Injectable } from "@nestjs/common";
import { Prisma, User } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";
import { PrismaService } from "prisma/prisma.service";






interface UserThings{
    id?:number;
    name?:string;
    email?:string;
    password?:string;
    data?:{
        [key:string]:any
    }
        
}


@Injectable()
export class UserService{
    private readonly prisma:Prisma.UserDelegate<DefaultArgs>;

    constructor(private readonly pr:PrismaService){
        this.prisma = pr.user
    };

    public async Insert({name,email,password}:UserThings):Promise<User>{
        try{

            const verificandoEmail = await this.prisma.findUnique({
                where:{
                    email:email
                }
            });

            if(verificandoEmail){
                console.error("Email already exists!");
                throw new Error("Email already exists!");
            };

            const postNewUser = await this.prisma.create({
                data:{
                    name:name,
                    email:email,
                    password:password,
                }
            });

            console.log("Novo email cadastrado!");

            return postNewUser;
        } catch(err){
          {server:`Error during the Insert data to the DB! Error: ${err}`};
           console.error(`Rolou um erro no service do usuário. Erro:${err}`);
           throw new Error(`A error happen when we try to INSERT the user from the DB! Error: ${err}`);
        };
    };



    public async SelectName():Promise<{id:number,name:string}[]>{
        try{
            const encontrarUsersByname = await this.prisma.findMany({
                select:{
                    id:true,
                    name:true
                }
            });
            return encontrarUsersByname
        }catch(err) {
            {server:`Error during the Select By Name operation: ${err.message || err}`};
            console.error("Erro ao recuperar usuários:", err);
            throw new Error(`Error during the Select By Name operation: ${err.message || err}`);
        };
    };

    public async SelectAll():Promise<User[]> {
        try{

            const mostraTudo = await this.prisma.findMany();
            return mostraTudo;
        } catch(err) {
            {server:`Error during the SelectAll operation: ${err.message || err}`};
            console.error("Erro ao recuperar usuários:", err);
            throw new Error(`Error during the SelectAll operation: ${err.message || err}`);
        };
    };

    public async SelectOne({id}:UserThings):Promise<User>{
        try{
            const encontraPeloId = await this.prisma.findFirst({
                where:{
                    id:Number(id)
                }
            });
            if (!encontraPeloId){
                console.error("We can't find the user id!");
                return null
            };
            return encontraPeloId;
        } catch(err){
            
        };
    };

    public async Delete({id}:UserThings):Promise<User>{
        try{

            const procurarId = await this.prisma.findFirst({
                where:{
                    id:Number(id)
                }
            });

            if(!procurarId){
                console.error(`Rolou um erro no service do usuário!`);
                throw new Error(`we can't find this ID!`);
            };

            const deletando = await this.prisma.delete({
                where:{
                    id:procurarId.id
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
            console.error(`Rolou um erro no service do usuário. Erro: ${err}`);
            throw new Error(`A error happen when we try to Delete the user from the DB! Error: ${err}`);
        };
    };

    public async Update({id,data}:UserThings):Promise<User>{
        try{
            const procurarId = await this.prisma.findFirst({
                where:{
                    id:Number(id)
                }
            });

            if(!procurarId){
                console.error(`Rolou um erro no service do usuário!`);
                throw new Error(`we can't find this ID!`);
            };

            const tentarAtualizar = await this.prisma.update({
                where:{
                    id:procurarId.id
                },
                data:data
            });

            if(!tentarAtualizar){
                console.error(`Rolou um erro no service do usuário!`);
                throw new Error(`Amazing error, check your internet please and try again!`);
            }

            return tentarAtualizar;

        } catch(err){
            {server:`A error happen when we try to UPDATE the user from the DB! Error: ${err}`};
            console.error(`Rolou um erro no service do usuário!`);
            throw new Error(`A error happen when we try to UPDATE the user from the DB! Error: ${err}`);
        };
    };

};