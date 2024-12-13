import { Body, Controller, Post } from "@nestjs/common";
import { UserService } from "./user.service";

@Controller("/user")
export class UserController{
    
    constructor(private readonly userService: UserService) {}
    
    @Post() 
    async post(@Body() userData){
        try{
            await this.userService.Insert(userData);
            return {userData};
        } catch(err){
            return {server:`Error during the POST method: ${err}`};
        };
    };
};