import { Injectable } from "@nestjs/common";

@Injectable()
export class CpfValidator{

    private calculateDigits(cpf: string[]):number {        
        try{
            cpf.slice(0,2);
            let numero:number = 0;
            let peso:number = 10;
            for(let i:number = 0; i < 9; i++){
                numero += Number(cpf[i]) * peso--;
                let resultado1 = Math.ceil(numero / 11);
                let resultado2 = resultado1 - 11;
                return resultado2;
            };
            for(let i =0; i < 10; i++){
                numero += Number(cpf) * peso--;
                let resultado3 = Math.ceil(numero / 11);
                let resultado4 = resultado3 - 11;
                return resultado4;
            };
        } catch(err){
            console.error(err);
            return null;
        }
    }

    public verify(cpf:string[]):boolean{ 
        try{
            this.calculateDigits(cpf);
            return true

        } catch(err){
            console.error(err);
            return false;
        }
    };

};