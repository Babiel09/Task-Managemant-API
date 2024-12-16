import { IsEmail, IsString, MinLength } from "class-validator";

export default abstract class CreateUser{

    @MinLength(10)
    name:string;

    @IsEmail(undefined, {message:"Pass one email to continue!"})
    email:string;

    @MinLength(8, {message:"The password needs to have the length more then 8!"})
    password:string;
};