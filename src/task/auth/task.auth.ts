import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
@Injectable()
export class AuthService2{
    
    constructor(private readonly jwtService:JwtService){};

    public async createToken(secret:string):Promise<string>{

            const jwt = this.jwtService.sign({secret});
            return jwt

    };

    public async checkToken(token:string):Promise<object>{
        try{
            const jwtVerified = await this.jwtService.verify(token);
            return jwtVerified;
        } catch(err){
            console.error(`Error during the jwt verification: ${err}`);
            throw new Error(err);
        }
    };
};