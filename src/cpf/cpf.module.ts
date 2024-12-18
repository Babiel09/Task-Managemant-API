import { Module } from "@nestjs/common";
import { CpfValidator } from "./cpf.service";

@Module({
    imports:[CpfModule],
    controllers:[],
    providers:[CpfValidator,],
})
export class CpfModule{};