import { Transform, TransformFnParams } from "class-transformer";
import { IsNotEmpty, Length } from "class-validator";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Postagem } from "../../postagem/entities/postagem.entity";


@Entity({name: "tb_temas"}) // create table tb_temas
export class Tema{
    
    @PrimaryGeneratedColumn() // PRIMARY KEY(id) AUTO_INCREMENT
    id: number;

    @Transform(({value } : TransformFnParams) => value?.trim) // remover espaços em branco do inicio e fim
    @IsNotEmpty() // Força digitação
    @Column({length: 100, nullable: false}) // VARCHAR(100) NOT NULL
    descricao: string;
    
    @OneToMany(() => Postagem, (postagem) => postagem.tema)
    postagem: Postagem[];
}