import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, Req, Res, UnauthorizedException } from "@nestjs/common";
import { Response } from "express";
import { TaskService } from "./task.service";
import { CreateTask } from "./DTO/taskCreation.dto"
import { AuthService2 } from "./auth/task.auth";

@Controller("/task")
export class TaskController{
    constructor(private readonly taskService:TaskService, private readonly auth2:AuthService2){};

    @Post("/v1")
    private async postNewTak(@Res() res:Response, @Body() data:CreateTask):Promise<Response>{
        try{

            if(!data.name) {
                console.error("O usuário esqueceu de passar o nome!");
                return res.status(400).json({server:"You need pass the NAME of the task!"});
            };
            if(!data.limitData) {
                console.error("O usuário esqueceu de passar o nome!");
                return res.status(400).json({server:"You need pass the LIMIT DATA of the task!"});
            };
            if(!data.about) {
                console.error("O usuário esqueceu de passar o nome!");
                return res.status(400).json({server:"You need pass the ABOUT of the task!"});
            };
            if(!data.secret) {
                console.error("O usuário esqueceu de passar o nome!");
                return res.status(400).json({server:"You need pass the SECRET of the task!"});
            };

            
            const secret2 = await this.auth2.createToken(data.secret);

            const realRealSecret = await this.auth2.checkToken(secret2);

            if(!realRealSecret){
                console.error("We got an error to check the jwt!");
                return res.status(500).json({server:"We got an error to check the jwt, please try again later!"});
            };

            data.secret = secret2;

            const procuraNome = await this.taskService.VerificaNome(data.name)

            if(procuraNome){
                return res.status(401).json({server:"The name is already in a Task, please try another name!"});
            };

            const newTask = await this.taskService.Insert(data); 

            if(!newTask){
                console.error("Amazing error, please try again later!")
                return res.status(500).json({server:"Amazing error, please try again later!"});
            };
            return res.status(201).send(newTask)
        } catch(err){
            console.error(err);
            return res.status(500).json({server:`${err}`});
        };
    };

    @Get("/v1")
    private async getAllTasks(@Res() res:Response):Promise<Response>{
        try{
            const allTheTasks = await this.taskService.SelectAll();
            if(!allTheTasks){
                console.error("Amazing error, please try again later!")
                return res.status(500).json({server:"Amazing error, please try again later!"});
            };
            return res.status(200).send(allTheTasks);
        } catch(err){
            console.error(err);
            return res.status(500).json({server:`${err}`});
        };
    };

    @Get("/v1/:id")
    private async getOneTask(@Res() res:Response, @Param("id") id:number):Promise<Response>{
        try{
            const taskEncontradoPeloId = await this.taskService.SelectOne(id);
            if(!taskEncontradoPeloId){
                console.error("Amazing error, please try again later!")
                return res.status(500).json({server:"Amazing error, please try again later!"});
            };
            return res.status(200).send(taskEncontradoPeloId);
        } catch(err){
            console.error(err);
            return res.status(500).json({server:`${err}`});
        };
    };

    @Delete("/v1")
    private async deleteAll(@Res() res:Response):Promise<Response>{
        try{
            const deletaTodasAstask = await this.taskService.DeleteAll();
            if(!deletaTodasAstask){
                console.error("Amazing error, please try again later!")
                return res.status(500).json({server:"Amazing error, please try again later!"});
            };
            return res.status(204)
        }catch(err){
            console.error(err);
            return res.status(500).json({server:`${err}`});
        };
    };

    @Delete("/v1/:id")
    private async deleteOneTask(@Res() res:Response, @Param("id") id:number):Promise<Response>{
        try{
            if(!id){
                return res.status(500).json({server:"You can't find this id!"});
            };
            const deletaTheTask = await this.taskService.Delete({id});

            if(!deletaTheTask){
                console.error("Amazing error, please try again later!")
                return res.status(500).json({server:"Amazing error, please try again later!"});
            };

            return res.status(204).json({server:"A Task foi deletada com sucesso!"});

        }catch(err){
            console.error(err);
            return res.status(500).json({server:`${err}`});
        };
    };
    @Put("/v1/:id")
    private async putTask(@Res() res:Response, @Param("id") id:number, @Body() data:{name:string, about:string, limitData:number, secret:string}):Promise<Response>{
        try{
            if(!id){
                return res.status(500).json({server:"You can't find this id!"});
            };

            const secret2 = await this.auth2.createToken(data.secret);

            const realRealSecret = await this.auth2.checkToken(secret2);

            if(!realRealSecret){
                console.error("We got an error to check the jwt!");
                return res.status(500).json({server:"We got an error to check the jwt, please try again later!"});
            };

            data.secret = secret2;

            const atualizaTask = await this.taskService.Update({id,data});
            if(!atualizaTask){
                console.error("Amazing error, please try again later!")
                return res.status(500).json({server:"Amazing error, please try again later!"});
            };
            return res.status(202).send(atualizaTask);
        }catch(err){
            console.error(err);
            return res.status(500).json({server:`${err}`});
        };
    };

};