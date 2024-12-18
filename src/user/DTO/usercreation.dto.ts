import { ArrayNotEmpty, IsArray, IsEmail, IsString, MaxLength, MinLength } from "class-validator";

export abstract class CreateUser{

    @IsString({message:"The name needs to be a string!"})
    @MinLength(10)
    name:string;

    @IsEmail(undefined, {message:"Pass one email to continue!"})
    email:string;

    @IsArray()
    @ArrayNotEmpty()
    @IsString({each:true})
    cpf:string[];
    
    @IsString({message:"The password needs to be a string!"})
    @MinLength(8, {message:"The password needs to have the length more then 8!"})
    password:string;
};