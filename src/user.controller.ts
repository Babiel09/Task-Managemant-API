import { Body, Controller, Get, HttpException, HttpStatus, Post } from "@nestjs/common";
import { UserService } from "./user.service";

@Controller("/user")
export class UserController{
    
    constructor(private readonly userService: UserService) {}
    
    @Post() 
    async post(@Body() userData:{name:string,email:string, password:string}){
        try{

            const username:string = userData.name;
            const userEmail:string = userData.email;
            const userPass:string = userData.password;

            if(!username){
                throw new HttpException ("You need to pass the user NAME!", HttpStatus.BAD_REQUEST);
            };

            if(!userEmail){
                throw new HttpException ("You need to pass the user EMAIL!", HttpStatus.BAD_REQUEST);
            };

            if(!userPass){
                throw new HttpException ("You need to pass the user PASSWORD!", HttpStatus.BAD_REQUEST);
            };
            
            const newUser = await this.userService.Insert(userData);
            
            if(!newUser){
                throw new HttpException ("Unxpected error during the POST method! We can't show to you the userData!", HttpStatus.BAD_REQUEST);
            };
            return {userData};
        } catch(err){
            return {server:`${err}`};
        };
    };

    @Get()
    async get(){
        try{
            const allUsers = await this.userService.SelectAll();
            
            if(!allUsers){
                throw new HttpException ("A giant error happen, please check your internet connection and try again!", HttpStatus.INTERNAL_SERVER_ERROR)
            };
            
            return {allUsers};

        } catch(err){
            return {server:`${err}`};
        }
    };
};