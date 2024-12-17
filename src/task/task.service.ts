import { Injectable } from "@nestjs/common";
import {  Prisma, Task } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";
import { PrismaService } from "prisma/prisma.service";



export interface TaskThings{
    id?: Number;
    name?:string;
    about?:string;
    limitData?:number;
    secret?:string;
    data?:{
        [key:string]:any
    };
}

@Injectable()
export class TaskService{

    private readonly prisma: Prisma.TaskDelegate<DefaultArgs>;

    constructor(private readonly pr:PrismaService){
        this.prisma = pr.task
    };

    public async VerificaNome(name:string):Promise<Task>{
        try{

            const verificaNome = await this.prisma.findUnique({
                where:{
                    name:name
                }
            });

            if(verificaNome){
                {server:"This name was already in a Task!"};
                console.error("Esse nome já foi atribuído para uma classe!");
            };
            return verificaNome;
        }catch(err) {
            {server:`Error during the SelectAll operation: ${err.message || err}`};
            console.error("Erro ao recuperar usuários:", err);
            return null;
        };
    };

    public async Insert({name,about,limitData,secret}:TaskThings):Promise<Task>{
        try{

            this.VerificaNome(name);

            const criarTask = await this.prisma.create({
                data:{
                    name:name,
                    about:about,
                    limitData:limitData,
                    secret:secret,
                }
            });

            if(!criarTask){
                {server:"We got an absurd error, please try again later"};
                console.error("Please, verify your connection and try later!");
            };

            return criarTask;


        } catch(err) {
            {server:`Error during the SelectAll operation: ${err.message || err}`};
            console.error("Erro ao recuperar usuários:", err);
            return null;
        };
    };

    public async SelectAll():Promise<Task[]>{
        try{
            const procuraTodasAsTasks = await this.prisma.findMany();
            if(!procuraTodasAsTasks){
                {server:"We got an absurd error, please try again later"};
                console.error("Please, verify your connection and try later!");
            };
            return procuraTodasAsTasks;
        }catch(err) {
            {server:`Error during the SelectAll operation: ${err.message || err}`};
            console.error("Erro ao recuperar usuários:", err);
            return null;
        };
    };

    public async Delete({id}:TaskThings):Promise<Task>{
        try{
            const procuraPeloid = await this.prisma.findFirst({
                where:{
                    id:Number(id)
                }
            });
            if(!procuraPeloid){
                {server:"We got an absurd error, please try again later"};
                console.error("Please, verify your connection and try later!");
            };
            const deltaATask = await this.prisma.delete({
                where:{
                    id:procuraPeloid.id
                }
            });
            return deltaATask;
        }catch(err) {
            {server:`Error during the SelectAll operation: ${err.message || err}`};
            console.error("Erro ao recuperar usuários:", err);
            return null;
        };
    };

    public async DeleteAll():Promise<any>{
        try{
            const deletarTodasAsTasks = await this.prisma.deleteMany();
            if(!deletarTodasAsTasks){
                {server:"We got an absurd error, please try again later"};
                console.error("Please, verify your connection and try later!");
            };
            return deletarTodasAsTasks;
        }catch(err) {
            {server:`Error during the SelectAll operation: ${err.message || err}`};
            console.error("Erro ao recuperar usuários:", err);
            return null;
        };
    };

    public async Update({id,data}:TaskThings):Promise<Task>{
        try{
            const procuraPeloid = await this.prisma.findFirst({
                where:{
                    id:Number(id)
                }
            });
            if(!procuraPeloid){
                {server:"We got an absurd error, please try again later"};
                console.error("Please, verify your connection and try later!");
            };
            
            const atualizaTask = await this.prisma.update({
                where:{
                    id:Number(procuraPeloid.id)
                },
                data:data
            });
            if(!atualizaTask){
                {server:"We got an absurd error, please try again later"};
                console.error("Please, verify your connection and try later!");
            };

            return atualizaTask;
        }catch(err) {
            {server:`Error during the SelectAll operation: ${err.message || err}`};
            console.error("Erro ao recuperar usuários:", err);
            return null;
        };
    };

    public async SelectOne(id:number):Promise<Task>{
        try{
            const tentaMostrarPeloId = await this.prisma.findFirst({
                where:{
                    id:Number(id)
                }
            });

            if(!tentaMostrarPeloId){
                {server:"We got an absurd error, please try again later"};
                console.error("Please, verify your connection and try later!");
            };

            return tentaMostrarPeloId;

        }catch(err) {
            {server:`Error during the SelectAll operation: ${err.message || err}`};
            console.error("Erro ao recuperar usuários:", err);
            return null;
        };
    };
};