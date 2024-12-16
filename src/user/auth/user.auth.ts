import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export default class AuthService{
    constructor(private readonly jwtService:JwtService){};

    async createToke(argument:any){
        return this.jwtService.sign({argument});
    };

    async checkToken(token:string){
        try{
            return this.jwtService.verify(token.replace("Bearer", ""))
        } catch(err){
            return false;
        };
    };

}