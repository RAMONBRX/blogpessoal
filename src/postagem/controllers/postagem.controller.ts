import { Controller, Get } from "@nestjs/common";
import { Postagem } from "../entities/postagem.entity";
import { PostagemService } from "../services/postagem.service";


@Controller("/postagens")
export class PostagemController{
    constructor(
        private readonly postagemService: PostagemService
    ){}

    @Get()
    findAll(): Promise<Postagem[]>{
        return this.postagemService.findAll();
    }
}