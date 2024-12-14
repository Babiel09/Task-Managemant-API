import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Req, Res } from "@nestjs/common";
import { UserService } from "./user.service";
import { Response } from "express";

@Controller("/user")
export class UserController{
    
    constructor(private userService: UserService) {}
    
    
    @Post() 
    async postUser(@Body() userData:{name:string,email:string, password:string}, @Res() res:Response){
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
                throw new HttpException ("Unxpected error during the POST method! We can't show to you the userData!", HttpStatus.BAD_REQUEST);
            };
            return res.status(HttpStatus.CREATED).send(newUser);
        } catch(err){
            return res.status(500).json({server:`${err}`});
        };
    };

    @Get()
    async getAllUsers(@Res() res:Response){
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

    @Delete("/:id")
    async deleteUser(@Param("id") id:number, @Res() res:Response){
        try{
            if(!id){
                throw new HttpException ("You need to pass the user ID!", HttpStatus.BAD_REQUEST);
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
};