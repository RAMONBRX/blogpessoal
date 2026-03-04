import { Transform, TransformFnParams } from "class-transformer";
import { IsNotEmpty, Length } from "class-validator";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Tema } from "../../tema/entities/tema.entity";

@Entity({name: "tb_postagens"}) // create table tb_postagens
export class Postagem{
    
    @PrimaryGeneratedColumn() // PRIMARY KEY(id) AUTO_INCREMENT
    id: number;

    @Transform(({value } : TransformFnParams) => value?.trim) // remover espaços em branco do inicio e fim
    @IsNotEmpty() // Força digitação
    @Column({length: 100, nullable: false}) // VARCHAR(100) NOT NULL
    titulo:string;

    @Transform(({value } : TransformFnParams) => value?.trim) // remover espaços em branco do inicio e fim
    @IsNotEmpty() // Força digitação
    @Column({length: 1000, nullable: false}) // VARCHAR(1000) NOT NULL
    texto: string;

    @UpdateDateColumn() // Atualza a data na criação e na atualização
    data: Date;

    @ManyToOne( () => Tema, (tema) => tema.postagem,{
        onDelete: "CASCADE"
    }
    )
    tema: Tema

}