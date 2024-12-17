import { IsInt, Max, MaxLength, MinLength } from "class-validator";
import { TaskThings } from "../task.service";

export abstract class CreateTask{
  @MinLength(4, {message:"The name need to have more than 4 caractheres!"})
    name:string;

    @MaxLength(500,{message:"The about only can have 500 caractheres!"})
    about:string;
    
    @IsInt({message:"The Limit Data needs to be an int number!"})
    @Max(30, {message:"The max number is 30!"})
    limitData:number;
    
    @MinLength(2, {message:"The secret needs have more than two caractheres!"})
    secret:string;
};