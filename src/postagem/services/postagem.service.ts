import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Postagem } from "../entities/postagem.entity";
import { ILike, Like, Repository } from "typeorm";
import { DeleteResult } from "typeorm/browser";


@Injectable()
export class PostagemService{

    constructor(
        @InjectRepository(Postagem)
        private postagemRepository : Repository<Postagem>,
    ){}

    async findAll():  Promise<Postagem[]>{
        // SELECT * FROM tb_postagens;
        return this.postagemRepository.find({
            relations: {
                tema: true
            }
        });
    }

    
    async findByid(id: number): Promise<Postagem>{
        // SELECT * FROM tb_postagens where id = ? ;
        const postagem = await this.postagemRepository.findOne({
            where:{
                id
            },
            relations: {
                tema: true
            }
        })

        if(!postagem)
            throw new HttpException("Postagem não encontrada!", HttpStatus.NOT_FOUND);

        return postagem;
    }

    async findAllByTitulo(titulo: string): Promise<Postagem[]>{
        // SELECT * FROM tb_postagens WHERE titulo LIKE '%?%';
        return this.postagemRepository.find({
            where:{
                titulo: Like(`%${titulo}%`)
            },
            relations: {
                tema: true
            }
        })
    }

    async create(postagem: Postagem): Promise<Postagem>{
        //INSERT INTO tb_postagens (titulo, texto) VALUES(?, ?);
        return await this.postagemRepository.save(postagem);
    }

    async update(postagem: Postagem): Promise<Postagem>{
        
        if(!postagem.id || postagem.id <= 0)
            throw new HttpException("O ID da postagem é inválido!", HttpStatus.BAD_REQUEST);

        await this.findByid(postagem.id);

        //UPDATE tb_postagens SET titulo = ?, texto = ?, data = CURRENT_TIMESTAMP() WHERE id = ?;
        return await this.postagemRepository.save(postagem);
    }

    async delete(id: number): Promise<DeleteResult>{
        
        await this.findByid(id);

        //DELETE tb_postagens FROM  ID = ?;
        return await this.postagemRepository.delete(id);
    }
}