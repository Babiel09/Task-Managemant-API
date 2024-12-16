import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, Req, Res } from "@nestjs/common";
import { UserService } from "./user.service";
import { Response } from "express";
import CreateUser from "./DTO/usercreation.dto";

@Controller("/user")
export class UserController{
    
    constructor(private userService: UserService) {}
    
    
    @Post("/v1") 
    public async postUser(@Body() userData:CreateUser, @Res() res:Response):Promise<Response>{
        try{

            const username:string = userData.name;
            const userEmail:string = userData.email;
            const userPass:string = userData.password;

            if(!username){
                return res.status(400).json({server:"You need to pass the user NAME!"});
            };

            if(!userEmail){
                return res.status(400).json({server:"You need to pass the user EMAIL!"});
            };

            if(!userPass){
                return res.status(400).json({server:"You need to pass the user PASSWORD!"});
            };
            
            const newUser = await this.userService.Insert(userData);
            
            if(!newUser){
                return res.status(500).json({server:"Unxpected error during the POST method! We can't show to you the userData!"});
            };
            return res.status(HttpStatus.CREATED).send(newUser);
        } catch(err){
            return res.status(500).json({server:`${err}`});
        };
    };

    @Get("/v1")
    public async getAllUsers(@Res() res:Response):Promise<Response>{
        try{
            const allUsers = await this.userService.SelectAll();
            
            if(!allUsers){
                throw new HttpException ("A giant error happen, please check your internet connection and try again!", HttpStatus.INTERNAL_SERVER_ERROR)
            };
            
            return res.status(200).send(allUsers);

        } catch(err){
            return res.status(500).json({server:`${err}`});
        }
    };

    @Delete("/v1/:id")
    public async deleteUser(@Param("id") id:number, @Res() res:Response):Promise<Response>{
        try{
            if(!id){
                return res.status(500).json({server:"You can't find this id!"});
            };

            const userDeletado = await this.userService.Delete({id});

            if(!userDeletado){
                throw new HttpException ("The API have an ABSURD ERROR, please try again later!", HttpStatus.INTERNAL_SERVER_ERROR);
            };

            return res.status(204).json({server:"The user is sucefully deleted!"});

        } catch(err){
            return res.status(500).json({server:`${err}`});
        }
    };

    @Put("/v1/:id")
    public async updateUser(@Param("id") id:number, @Res() res:Response, @Body() data:CreateUser):Promise<Response>{
        try{
            if(!id){
                return res.status(500).json({server:"You can't find this id!"});
            };

            const userAtualizado = await this.userService.Update({id,data});
            if(!userAtualizado){
                return res.status(500).json({server:"Amazin error in the PUT method, please try your wi fi connection and try again later!"});
            };

            return res.status(202).send(userAtualizado);

        }catch(err){
            return res.status(500).json({server:`${err}`});
        };
    };

    @Get("/v1/:id")
    public async getOneUser(@Param("id") id:number, @Res() res:Response):Promise<Response>{
        try{
            if(!id){
                return res.status(500).json({server:"You can't find this id!"});
            };

            const encontradoUmUser = await this.userService.SelectOne({id});

            if(!encontradoUmUser){
                return res.status(500).json({server:"We can't show to you the specified user, please try again later!"});
            };

            return res.status(200).send(encontradoUmUser);

        } catch(err){
            return res.status(500).json({server:`${err}`});
        };
    };

    @Get("/v2")
    public async getUserOnlyTheName(@Res() res:Response):Promise<Response>{
        try{
            const usersname = await this.userService.SelectName();
            if(!usersname){
                return res.status(500).json({server:`Amazing error! Please try again later!`});
            };
            return res.status(200).send(usersname);
        } catch(err){
            return res.status(500).json({server:`${err}`});
        };
    };
};